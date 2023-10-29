import { Request, Response } from 'express';
import { PaymentService } from './payment.services';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';

const initPayment = async (req: Request, res: Response) => {
  const result = await PaymentService.initPayment(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'payment init successful',
    data: result
  });
};

const webhook = async (req: Request, res: Response) => {
  const result = await PaymentService.webhook(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'payment verified',
    data: result
  });
};

export const PaymentController = {
  initPayment,
  webhook
};
