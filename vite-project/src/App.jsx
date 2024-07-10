import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  MenuOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Bank from "./page/Bank.jsx";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const onBreakpointChange = (broken) => {
    if (broken) {
      setCollapsed(true); // Nếu màn hình nhỏ hơn breakpoint, tự động thu gọn Sider
    }
  };

  const onCollapse = (collapsed, type) => {
    console.log(collapsed, type);
    setCollapsed(collapsed);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider
        // breakpoint="xg"
        // collapsedWidth="0"
        // onBreakpoint={onBreakpointChange}
        // onCollapse={onCollapse}

        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="xg"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ position: "fixed", top: "50%", right: 0, zIndex: 1 }}
        >
          <MenuOutlined />
        </Button>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Bank />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Mr.Thuy ©{new Date().getFullYear()} Created by Mr.Thuy
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
