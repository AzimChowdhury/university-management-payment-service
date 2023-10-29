import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import config from '../../../config';
import axios from 'axios';

const initPayment = async (payload: any) => {
  try {
    const data = {
      store_id: config.ssl.storeId,
      store_passwd: config.ssl.storePass,
      total_amount: payload.total_amount,
      currency: 'BDT',
      tran_id: payload.tran_id,
      success_url: 'http://localhost:3030/success',
      fail_url: 'http://localhost:3030/fail',
      cancel_url: 'http://localhost:3030/cancel',
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'N/A',
      product_name: 'Semester Payment.',
      product_category: 'Payment',
      product_profile: 'Student',
      cus_name: payload.cus_name,
      cus_email: payload.cus_email,
      cus_add1: payload.cus_add1,
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: payload.cus_phone,
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh'
    };

    const response = await axios({
      method: 'post',
      url: config.ssl.sslPaymentUrl,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'payment Error');
  }
};

const validate = async (data: any) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${config.ssl.sslValidatorUrl}?val_id=${data.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=json`
    });
    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment Error');
  }
};

export const SslService = {
  initPayment,
  validate
};
