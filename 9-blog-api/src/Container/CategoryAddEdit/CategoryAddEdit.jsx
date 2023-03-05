import { Button, Form, Input, message, Typography } from "antd";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { categoryService } from "../../Services/CategoryService";
import {
  authenticatedRoutes,
  globalReactQueryOptions,
} from "../../Utilities/Util.constant";

function CategoryAddEdit() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id: categoryId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: addCategoryRequest, isLoading: categoryLoading } =
    useMutation(categoryService.addCategory);

  const {
    mutateAsync: updateCategoryRequest,
    isLoading: updateCategoryLoader,
  } = useMutation(async ({ categoryIdParam, payload }) => {
    await categoryService.updateCategoryById(categoryIdParam, payload);
  });

  const editQueryFunction = async () =>
    await categoryService.getCategoryById(categoryId);

  const { data: editCategoryData, isLoading: categoryEditLoader } = useQuery(
    "category_edit",
    editQueryFunction,
    {
      ...globalReactQueryOptions,
      enabled: Boolean(categoryId), //if you have cateogry id enable this call
    }
  );

  useEffect(() => {
    if (editCategoryData?.data?.results) {
      const singleCategoryObject = editCategoryData?.data?.results;
      form.setFieldsValue({
        cat_title: singleCategoryObject?.cat_title,
      });
    }
  }, [editCategoryData, form]);

  const onFinishHandler = async (values) => {
    if (Boolean(categoryId)) {
      await updateCategoryRequest({
        categoryIdParam: categoryId,
        payload: values,
      });
    } else {
      await addCategoryRequest(values);
    }

    messageApi.success("category created successfully!");
    form.resetFields();
    navigate(authenticatedRoutes.CATEGORIES);
  };

  return (
    <div className="add-edit-category">
      {contextHolder}
      <Title level={2} className="custom-heading-login">
        {Boolean(categoryId) ? "Update" : "Add"}Category
      </Title>
      <Form
        name="basic"
        autoComplete="off"
        onFinish={onFinishHandler}
        form={form}
      >
        <Form.Item
          name="cat_title"
          rules={[
            {
              required: true,
              message: "Please input your category title!",
            },
          ]}
        >
          <Input placeholder="Category Title" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={
              updateCategoryLoader || categoryLoading || categoryEditLoader
            }
          >
            {Boolean(categoryId) ? "Update" : "Create"} Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CategoryAddEdit;
