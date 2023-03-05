import { Button, Space } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { userServices } from "../../Services/User.services";
import { authenticatedRoutes, globalReactQueryOptions } from "../../Utilities/Util.constant";
import GridViewTable from "../GridViewTable/GridViewTable";

function Users() {
  const navigate = useNavigate();

  const { data: userData, isLoading: userDataLoader } = useQuery(
    "user",
    userServices.get
  ,{
    ...globalReactQueryOptions,
    staleTime: 0,
  })

  const column = [
    {
      title: "User Id",
      key: "id",
      render: (record) => {
        return record.user_id;
      },
    },
    {
      title: "Title",
      key: "title",
      render: (record) => record.user_title,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        console.log(record, "record");
        return (
          <Space size="middle">
            <Button
              type="primary"
              // onClick={() => {
              //   const editCategoryUrl =
              //     authenticatedRoutes.EDIT_CATEGORY.replace(
              //       ":id",
              //       record.cat_id
              //     );
              //   navigate(editCategoryUrl);
              // }}
            >
              Edit{" "}
            </Button>
            <Button
              type="default"
              // onClick={() => userDeleteButtonHandler(record.user_id)}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      {/* {contextHolder} */}
      <GridViewTable
        columns={column}
        dataSource={userData?.data?.results}
        loading={userDataLoader}
        isAddButtonEnable
        addBtnTitle="Add User"
        addBtnClick={() => {
          navigate(authenticatedRoutes.ADD_USER);
        }}
      />
    </>
  );
}

export default Users;
