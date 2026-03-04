import axios from 'axios';
import config from '../config';

const API = config.API_BASE_URL;

export const registerCustomer = async (formData) => {
  try {
    const res = await axios.post(`${API}/customer/auth/register`, formData);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Registration failed.';
  }
};

export const resendVerification = async (email) => {
  try {
    const res = await axios.post(`${API}/customer/auth/resend-verification`, { email });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Failed to resend.';
  }
};

export const loginCustomer = async (credentials) => {
  try {
    const res = await axios.post(`${API}/customer/auth/login`, credentials, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    // full error object throw — notVerified flag-ku
    throw err.response?.data || { message: 'Login failed.' };
  }
};

export const logoutCustomer = async () => {
  try {
    await axios.post(`${API}/customer/auth/logout`, {}, { withCredentials: true });
  } catch { /* silent */ }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(`${API}/customer/auth/forgot-password`, { email });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Something went wrong.';
  }
};

export const resetPasswordConfirm = async (data) => {
  try {
    const res = await axios.post(`${API}/customer/auth/reset-password`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Reset failed.';
  }
};