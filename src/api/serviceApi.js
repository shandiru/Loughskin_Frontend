import axiosInstance from "./axiosInstance";

export const getActiveServicesGrouped = async () => {
  const res = await axiosInstance.get("/services/active-grouped");
  return res.data;
};

export const getServiceById = async (id) => {
  const res = await axiosInstance.get(`/services/${id}`);
  return res.data;
};
export const getAllServices = async () => {
  const res = await axiosInstance.get('/services');
  return res.data;
};
