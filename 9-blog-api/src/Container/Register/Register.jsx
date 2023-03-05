import { Button, Form, Input, message, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomUpload from "../../Components/CustomUpload/CustomUpload";
import { userServices } from "../../Services/User.services";
import { unAuthenticatedRoutes } from "../../Utilities/Util.constant";

import "./Register.css";

const { Title } = Typography;
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = useState();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("user_firstname", values.firstName);
    formData.append("user_lastname", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("c_password", values.password);
    formData.append("user_image", file);

    setLoading(true);
    const { ok, data: registerData } = await userServices.register(formData);
    if (ok) {
      console.log(registerData, "registerData");
      messageApi.success("user is regsitered successfully!");
    }
    setLoading(false);
  };

  const customRequestCallback = (file) => {
    setFile(file);
  };

  return (
    <div className="custom-register-container">
      {contextHolder}
      <Title level={2} className="custom-heading-register">
        Register
      </Title>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: "Please input your userName!",
            },
          ]}
        >
          <Input placeholder="User Name" />
        </Form.Item>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your firstName!",
            },
          ]}
        >
          <Input placeholder="first Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
          ]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <CustomUpload customRequestCallback={customRequestCallback} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
            },
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
          <Link to={unAuthenticatedRoutes.LOGIN} className="login-button">
            Login
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
