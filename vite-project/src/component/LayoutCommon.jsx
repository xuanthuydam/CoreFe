import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
const { Content, Sider, Footer } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const LayoutCommon = () => {
  return (
    <Layout>
      <Layout>
        {/* 20 viewport height */}
        <Sider width={"20vw"}>
          <Menu
            className="menu-layout"
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            items={items2}
          />
        </Sider>
        <Layout>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content>Content</Content>
        </Layout>
      </Layout>
      <Footer>Creator @xuanthuydam.06072000@gmail.com</Footer>
    </Layout>
  );
};

export default LayoutCommon;

//https://stackblitz.com/run?file=demo.js
