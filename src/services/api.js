import axios from "axios";
const BASE_URL = "https://dummyjson.com";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const getProducts = async (limit = 10, skip = 0) => {
  const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
};
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
export const searchProducts = async (query, limit = 10, skip = 0) => {
  const response = await api.get(
    `/products/search?q=${query}&limit=${limit}&skip=${skip}`,
  );
  return response.data;
};
export const getCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};
export const getProductsByCategory = async (category, limit = 10, skip = 0) => {
  const response = await api.get(
    `/products/category/${category}?limit=${limit}&skip=${skip}`,
  );
  return response.data;
};
export default api;
