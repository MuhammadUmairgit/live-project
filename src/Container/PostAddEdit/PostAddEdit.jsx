/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Typography,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import CustomUpload from "../../Components/CustomUpload/CustomUpload";
import { categoryService } from "../../Services/CategoryService";
import { postsService } from "../../Services/PostsService";
import { authenticatedRoutes, globalReactQueryOptions } from "../../Utilities/Util.constant";

function PostAddEdit() {
  const { Title } = Typography;
  const { TextArea } = Input;

  const [file, setFile] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: postByIdData, isLoading: postByIdLoader } = useQuery(
    ["categories", postId],
    () => postsService.getPostById(postId)
  );

  const singlePostData = postByIdData?.data?.results;

  useEffect(() => {
    if (postId) {
    }
  }, [postId]);

  useEffect(() => {
    if (singlePostData) {
      form.setFieldsValue({
        post_title: singlePostData?.post_title,
        post_author: singlePostData?.post_author,
        post_category_id: singlePostData?.post_category_id,
        post_content: singlePostData?.post_content,
        post_date: moment(singlePostData?.post_date),
        post_status: singlePostData?.post_status,
        post_tags: singlePostData?.post_tags,
      });
    }
  }, [singlePostData]);

  const { data: categoryData, isLoading: categoryLoading } = useQuery(
    "categories",
    categoryService.getCategories,
    {
      ...globalReactQueryOptions,
    }
  );

  const { mutateAsync: addPostRequest, isLoading: addPostLoader } = useMutation(
    postsService.addPost
  );

  const onFinishHandler = async (values) => {
    const formData = new FormData();
    formData.append("post_author", values?.post_author);
    formData.append("post_category_id", values?.post_category_id);
    formData.append("post_content", values?.post_content);
    formData.append("post_date", values?.post_date);
    formData.append("post_status", values?.post_status);
    formData.append("post_tags", values?.post_tags);
    formData.append("post_title", values?.post_title);

    if (file) {
      formData.append("post_image", file); //append binary file
    }

    await addPostRequest(formData);
    messageApi.success("post added successfully !");
    navigate(authenticatedRoutes.POSTS);
  };

  const customRequestCallback = (info) => {
    setFile(info?.file);
  };

  return (
    <div className="add-edit-post">
      {contextHolder}
      <Title level={2} className="custom-heading-login">
        {Boolean(postId) ? "Update" : "Create"} Post
      </Title>
      <Form
        name="basic"
        autoComplete="off"
        form={form}
        onFinish={onFinishHandler}
      >
        <Form.Item
          name="post_title"
          rules={[
            {
              required: true,
              message: "Please input your post title!",
            },
          ]}
        >
          <Input placeholder="Post Title" />
        </Form.Item>

        <Form.Item
          name="post_category_id"
          rules={[
            {
              required: true,
              message: "Please input your post category Id!",
            },
          ]}
        >
          <Select placeholder="Post Category Id">
            {categoryData?.data?.results?.map((singleCategory) => (
              <Select.Option
                value={singleCategory.cat_id}
                key={singleCategory.cat_id}
              >
                {singleCategory.cat_title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="post_author"
          rules={[
            {
              required: true,
              message: "Please input your post author!",
            },
          ]}
        >
          <Input placeholder="Post Author" />
        </Form.Item>
        <Form.Item
          name="post_date"
          rules={[
            {
              required: true,
              message: "Please input your post date!",
            },
          ]}
        >
          <DatePicker className="w-100 " />
        </Form.Item>
        <Form.Item
          name="post_content"
          rules={[
            {
              required: true,
              message: "Please input your post content!",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Post Content" />
        </Form.Item>
        <Form.Item
          name="post_status"
          rules={[
            {
              required: true,
              message: "Please input your post status!",
            },
          ]}
        >
          <Select placeholder="Post Status">
            <Select.Option value="draft">Draft</Select.Option>
            <Select.Option value="publish">Publish</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="post_tags"
          rules={[
            {
              required: true,
              message: "Please input your post tags !",
            },
          ]}
        >
          <Input placeholder="Post Tags " />
        </Form.Item>

        <Form.Item>
          <CustomUpload customRequestCallback={customRequestCallback} />

          {singlePostData?.image ? (
            <img
              src={singlePostData?.image}
              alt={singlePostData?.post_title}
              width={200}
              style={{ marginTop: 20 }}
            />
          ) : (
            <>{postId && <p>No Image Found</p>}</>
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={categoryLoading || addPostLoader || postByIdLoader}
          >
            {Boolean(postId) ? "Update" : "Create"} Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostAddEdit;
