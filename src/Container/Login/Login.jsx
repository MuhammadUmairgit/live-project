import { Button, Form, Input, message, Typography } from "antd";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { userServices } from "../../Services/User.services";
import { APP_TOKEN_NAME, unAuthenticatedRoutes } from "../../Utilities/Util.constant";
import "./Login.css";

const { Title } = Typography;
const Login = () => {
  const loginQueryFunction = async (values) => {
    return await userServices.login(values);
  };

  const { mutateAsync: mutateLogin, isLoading: loading } = useMutation(
    loginQueryFunction,
    {
      onSuccess: ({ data }) => {
        const {
          results: { token },
        } = data;
        localStorage.setItem(APP_TOKEN_NAME, token);
        messageApi.success("you are logged in successfully !");
        window.location.reload();
      },
    }
  );
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    await mutateLogin(values);
  };

  return (
    <div className="custom-login-container">
      {contextHolder}
      <Title level={2} className="custom-heading-login">
        Login
      </Title>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
          initialValue="retta.schimmel@example.com"
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          initialValue="admin123@"
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
          <Link to={unAuthenticatedRoutes.REGISTER} className="sign-up-btn">
            Sign Up
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
