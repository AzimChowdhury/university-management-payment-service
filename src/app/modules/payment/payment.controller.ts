import { Request, Response, NextFunction } from 'express';
import { PaymentService } from './payment.services';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paymentFilterableFields } from './payment.constants';

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

const getAllFromDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, paymentFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await PaymentService.getAllFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payments fetched successfully',
      meta: result.meta,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};

const getByIdFromDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await PaymentService.getByIdFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment fetched successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const PaymentController = {
  initPayment,
  webhook,
  getAllFromDB,
  getByIdFromDB
};
