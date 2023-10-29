import express from 'express';
import { PaymentController } from './payment.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
const router = express.Router();

router.get(
  '/',
  //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  PaymentController.getAllFromDB
);
router.get(
  '/:id',
  //   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  PaymentController.getByIdFromDB
);
router.post('/init', PaymentController.initPayment);
router.post('/webhook', PaymentController.webhook);

export const PaymentRoutes = router;
