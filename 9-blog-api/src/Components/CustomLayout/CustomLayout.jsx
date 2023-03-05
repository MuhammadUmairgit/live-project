import React, { useState } from "react";
import {  Divider, Layout, Menu, Typography } from "antd";
import { sidebarItems } from "./SidebarConstant";
import { Outlet } from "react-router-dom";
import "./CustomLayout.css";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const CustomLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="custom-layout-container">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Divider />

        <Title level={2} className="main-sidebar-heading">
          Blog
        </Title>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" />
        <Content className="custom-main-content">
          {/* <Breadcrumb className="custom-bread-crumb-container">
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="site-layout-background  custom-inner-content">
            <Outlet />
          </div>
        </Content>
        <Footer className="custom-main-layout-footer">Copyright 2023</Footer>
      </Layout>
    </Layout>
  );
};
export default CustomLayout;
