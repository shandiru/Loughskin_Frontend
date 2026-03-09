import axiosInstance from './axiosInstance';

export const getAvailableSlots = async (serviceId, date, customerGender, staffGenderPreference) => {
  const params = new URLSearchParams({ serviceId, date });
  if (customerGender)                                          params.append('customerGender', customerGender);
  if (staffGenderPreference && staffGenderPreference !== 'any') params.append('staffGenderPreference', staffGenderPreference);
  const res = await axiosInstance.get(`/bookings/available-slots?${params}`);
  return res.data;
};

export const createBooking = async (data) => {
  const res = await axiosInstance.post('/bookings', data);
  return res.data;
};

export const getMyBookings = async () => {
  const res = await axiosInstance.get('/bookings/my');
  return res.data;
};