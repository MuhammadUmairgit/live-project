import { apiServices } from "./Api.services";

const categoryUrl = {
  get: "/categories",
};

const getCategories = () => {
  const response = apiServices.get(categoryUrl.get);
  return response;
};

const getCategoryById = (categoryId) => {
  const response = apiServices.get(`${categoryUrl.get}/${categoryId}`);
  return response;
};

const addCategory = (payload) => {
  const response = apiServices.post(categoryUrl.get, payload);
  return response;
};
const deleteCategory = (categoryId) => {
  const response = apiServices.delete(`${categoryUrl.get}/${categoryId}`);
  return response;
};

const updateCategoryById = (categoryId, payload) => {
  const response = apiServices.put(`${categoryUrl.get}/${categoryId}`, payload);
  return response;
};

export const categoryService = {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategoryById,
  getCategoryById,
};
