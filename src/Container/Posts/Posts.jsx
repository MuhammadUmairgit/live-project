import React from "react";
import { Button, Badge, Modal } from "antd";
import { useMutation, useQuery } from "react-query";
import { postsService } from "../../Services/PostsService";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  authenticatedRoutes,
  globalReactQueryOptions,
} from "../../Utilities/Util.constant";
import { utilService } from "../../Utilities/Util.Service";
import { useNavigate } from "react-router";
import GridViewTable from "../GridViewTable/GridViewTable";

function Posts() {
  const navigate = useNavigate();
  const { confirm } = Modal;

  const {
    data: postsData,
    isLoading: postLoading,
    refetch: refetchPosts,
  } = useQuery("posts", postsService.getPost, {
    ...globalReactQueryOptions,
    staleTime: 0,
  });

  const { mutateAsync: postDeleteRequest, isLoading: deletePostLoading } =
    useMutation(postsService.deletePostById);

  const deletButtonHandler = (postId) => {
    // event.preventDefault();
    if (postId) {
      confirm({
        title: "Do You Want To Delete This Post?",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          postDeleteRequest(postId, {
            onSuccess: () => {
              refetchPosts();
            },
          });
        },
        onCancel() {
          console.log("cancel");
        },
      });
    }
  };

  const postListingColumns = [
    {
      title: "Post Id",
      key: "id",
      render: (record) => {
        return record.id;
      },
    },
    {
      title: "Post Title",
      key: "post_title",
      render: (record) => {
        return record.post_title;
      },
    },
    {
      title: "Post Author",
      key: "post_author",
      render: (record) => {
        return record.post_author;
      },
    },
    {
      title: "Post Date",
      key: "post_date",
      render: (record) => {
        return utilService.convertDateToOurFormat(record.post_date);
      },
    },
    {
      title: "Post Status",
      key: "post_status",
      render: (record) => {
        return (
          <Badge
            count={record?.post_status?.toUpperCase()}
            color={record?.post_status === "draft" ? "#52c41a" : "#faad14"}
          />
        );
      },
    },
    {
      title: "Post Image",
      key: "post_image",
      render: (record) => {
        if (!record.image) {
          return <p>No Image Found!</p>;
        }
        return <img src={record?.image} alt={record.post_title} />;
      },
    },
    {
      title: "Created At",
      key: "created_at",
      render: (record) => {
        return utilService.convertDateToOurFormat(record.created_at);
      },
    },
    {
      title: "Updated At",
      key: "updated_at",
      render: (record) => {
        return utilService.convertDateToOurFormat(record.updated_at);
      },
    },
    {
      title: "Edit",
      key: "edit",
      render: (text, record) => {
        return (
          <Button
            type="primary"
            ghost
            onClick={() => {
              navigate(
                authenticatedRoutes.EDIT_POSTS.replace(":id", record.id)
              );
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      key: "delete",
      render: (text, record, index) => {
        return (
          <Button
            type="primary"
            danger
            onClick={() => deletButtonHandler(record?.id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <GridViewTable
      columns={postListingColumns}
      dataSource={postsData?.data?.results || []}
      loading={postLoading || deletePostLoading}
      isAddButtonEnable
      addBtnTitle="Add Post"
      addBtnClick={() => {
        navigate(authenticatedRoutes.ADD_POST);
      }}
    />
  );
}

export default Posts;
