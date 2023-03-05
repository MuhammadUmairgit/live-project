import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row, Table, Space, message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { categoryService } from "../../Services/CategoryService";

import "./Categories.css";
import {
  authenticatedRoutes,
  globalReactQueryOptions,
} from "../../Utilities/Util.constant";
import GridViewTable from "../GridViewTable/GridViewTable";

function Categories() {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const reactQueryName = "categories";
  const reactQueryApiCallPromise = categoryService.getCategories;

  const {
    isLoading: categoryLoading,
    data: categoryData,
    refetch: categoryRefech,
  } = useQuery(reactQueryName, reactQueryApiCallPromise, {
    ...globalReactQueryOptions,
    staleTime: 0, //cache expiry time
  });

  const {
    mutateAsync: categoryDeleteRequest,
    isLoading: deleteCategoryLoader,
  } = useMutation(categoryService.deleteCategory);

  const categoryDeleteHandler = async (categoryId) => {
    if (categoryId) {
      confirm({
        title: "Do you want to delete this category?",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          categoryDeleteRequest(categoryId, {
            onSuccess: () => {
              categoryRefech();
              messageApi.success("category deleted successfully !");
            },
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  const columns = [
    {
      title: "Category Id",
      key: "id",
      render: (record) => {
        return record.cat_id;
      },
    },
    {
      title: "Title",
      key: "title",
      render: (record) => record.cat_title,
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
              onClick={() => {
                const editCategoryUrl =
                  authenticatedRoutes.EDIT_CATEGORY.replace(
                    ":id",
                    record.cat_id
                  );
                navigate(editCategoryUrl);
              }}
            >
              Edit{" "}
            </Button>
            <Button
              type="default"
              onClick={() => categoryDeleteHandler(record.cat_id)}
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
      {contextHolder}
      <GridViewTable
        columns={columns}
        dataSource={categoryData?.data?.results}
        loading={categoryLoading || deleteCategoryLoader}
        isAddButtonEnable
        addBtnTitle="Add Category"
        addBtnClick={() => {
          navigate(authenticatedRoutes.ADD_CATEOGRY);
        }}
      />
    </>
  );
}

export default Categories;
