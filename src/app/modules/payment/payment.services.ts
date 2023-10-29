import { PaymentStatus } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { SslService } from '../ssl/ssl.services';

const initPayment = async (data: any) => {
  const paymentSession = await SslService.initPayment({
    total_amount: data.amount,
    tran_id: data.transactionId,
    cus_name: data.studentName,
    cus_email: data.studentEmail,
    cus_add1: data.address,
    cus_phone: data.phone
  });
  await prisma.payment.create({
    data: {
      amount: data.amount,
      transactionId: data.transactionId,
      studentId: data.studentId
    }
  });
  return paymentSession.redirectGatewayURL;
};

const webhook = async (payload: any) => {
  if (!payload || !payload?.status || payload?.status !== 'VALID') {
    return {
      message: 'invalid payment'
    };
  }
  const result = await SslService.validate(payload.val_id);

  if (result?.status !== 'VALID') {
    return {
      message: 'payment failed'
    };
  }

  const { tran_id } = result;
  await prisma.payment.updateMany({
    where: {
      transactionId: tran_id
    },
    data: {
      status: PaymentStatus.PAID,
      paymentGatewayData: payload
    }
  });

  return {
    message: 'payment success'
  };
};

export const PaymentService = {
  initPayment,
  webhook
};
