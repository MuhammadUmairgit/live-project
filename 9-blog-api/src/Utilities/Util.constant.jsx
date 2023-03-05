export const APP_TOKEN_NAME = "TOKEN";

export const unAuthenticatedRoutes = {
  LOGIN: "/",
  REGISTER: "/register",
};

export const authenticatedRoutes = {
  DASHBOARD: "/",
  CATEGORIES: "/categories",
  ADD_CATEOGRY: "/category/add",
  EDIT_CATEGORY: "/category/edit/:id", // ":id" is used for dynamic url
  POSTS: "/posts",
  ADD_POST: "/posts/add",
  EDIT_POSTS: "/posts/edit/:id", // ":id" is used for dynamic url
  USERS: "/users",
  ADD_USER: "/users/add",
  EDIT_USER: "/users/edit/:id", // ":id" is used for dynamic url
};

export const FooterText = "copyright 2023";

export const globalReactQueryOptions = {
  refetchOnMount: "always",
};
