

const config = {
  API_BASE_URL: import.meta.env.VITE_API_URL,
};

export const getImageUrl = (path) => `https://lough-porject.onrender.com${path}`;

export default config;