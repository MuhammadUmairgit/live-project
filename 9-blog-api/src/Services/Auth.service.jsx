import { APP_TOKEN_NAME } from "../Utilities/Util.constant";

const isUserLogin = () => {
  const token = localStorage.getItem(APP_TOKEN_NAME);
  if (!token) {
    return false;
  }
  return true;
};

const getUserToken = () => {
  const token = localStorage.getItem(APP_TOKEN_NAME);
  return token;
};

export const authService = {
  isUserLogin,
  getUserToken,
};
