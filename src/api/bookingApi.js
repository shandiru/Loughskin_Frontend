import axiosInstance from './axiosInstance';

export const getAvailableSlots = async (serviceId, date, customerGender, staffGenderPreference) => {
  const params = new URLSearchParams({ serviceId, date });
  if (customerGender)                                           params.append('customerGender', customerGender);
  if (staffGenderPreference && staffGenderPreference !== 'any') params.append('staffGenderPreference', staffGenderPreference);
  const res = await axiosInstance.get(`/bookings/available-slots?${params}`);
  return res.data;
};

// Creates a Stripe checkout session and returns { url, sessionId }
export const createCheckoutSession = async (data) => {
  const res = await axiosInstance.post('/payments/create-checkout', data);
  return res.data;
};

// Polls after Stripe redirect — may return { pending: true } if webhook hasn't fired yet
export const getSessionBooking = async (sessionId) => {
  const res = await axiosInstance.get(`/payments/session/${sessionId}`);
  return res.data;
};

export const getMyBookings = async () => {
  const res = await axiosInstance.get('/bookings/my');
  return res.data;
};

export const requestBookingCancellation = async (bookingId, reason) => {
  const res = await axiosInstance.post(`/bookings/${bookingId}/cancel-request`, { reason });
  return res.data;
};
