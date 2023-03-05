import React from "react";
import { Route, Routes } from "react-router";
import CustomLayout from "../../Components/CustomLayout/CustomLayout";
import Categories from "../../Container/Categories/Categories";
import CategoryAddEdit from "../../Container/CategoryAddEdit/CategoryAddEdit";
import Dashboard from "../../Container/Dashboard/Dashboard";
import PostAddEdit from "../../Container/PostAddEdit/PostAddEdit";
import Posts from "../../Container/Posts/Posts";
import Users from "../../Container/Users/Users";
import UsersAddEdit from "../../Container/UsersAddEdit/UsersAddEdit";
import { authenticatedRoutes } from "../../Utilities/Util.constant";

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<CustomLayout />}>
        <Route path={authenticatedRoutes.DASHBOARD} element={<Dashboard />} />
        <Route path={authenticatedRoutes.CATEGORIES} element={<Categories />} />
        <Route path={authenticatedRoutes.ADD_CATEOGRY} element={<CategoryAddEdit />} />
        <Route path={authenticatedRoutes.EDIT_CATEGORY} element={<CategoryAddEdit />} />
        <Route path={authenticatedRoutes.POSTS} element={<Posts />} />
        <Route path={authenticatedRoutes.ADD_POST} element={<PostAddEdit />} />
        <Route path={authenticatedRoutes.USERS} element={<Users />} />
        <Route path={authenticatedRoutes.ADD_USER} element={<UsersAddEdit />} />
        <Route path={authenticatedRoutes.ADD_USER} element={<UsersAddEdit />} />
      </Route>
    </Routes>
  );
}

export default AuthenticatedRoutes;
