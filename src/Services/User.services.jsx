import { apiServices } from "./Api.services";

const userServiceUrl = {
  login: "/login",
  register: "/register",
  GET:"/user"
};

const login = (data) => {
  const response = apiServices.post(userServiceUrl.login, data);
  return response;
};
const register = (data) => {
  const response = apiServices.post(userServiceUrl.register, data);
  return response;
};

const get = () => {
  const response = apiServices.get(userServiceUrl.GET);
  return response;
};

export const userServices = {
  login,
  register,
  get,
};
