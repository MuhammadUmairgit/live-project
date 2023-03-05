import { create } from "apisauce";
import { authService } from "./Auth.service";

const apiSauceInstance = create({
  baseURL: process.env.REACT_APP_API_URL,
});

const get = (url, queryParams, config) => {
  const response = apiSauceInstance.get(url, queryParams, config);
  return response;
};

const post = (url, data, config) => {
  const response = apiSauceInstance.post(url, data, config);
  return response;
};

const put = (url, data, config) => {
  const response = apiSauceInstance.put(url, data, config);
  return response;
};

const patch = (url, data, config) => {
  const response = apiSauceInstance.patch(url, data, config);
  return response;
};

//  https://blog-api-testing.squadcodersdev.com/api/post/delete?id=2&post_name=2222

const deleteRequest = (url, queryParams, config) => {
  const response = apiSauceInstance.delete(url, queryParams, config);
  //  const response = apiSauceInstance.delete(url,{
  //    id:2,
  //    post_name:2222
  //  },config);
  return response;
};

apiSauceInstance.addRequestTransform((request) => {
  if (authService.isUserLogin()) {
    request.headers["Authorization"] = `Bearer ${authService.getUserToken()}`;
  }
});

export const apiServices = {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};
