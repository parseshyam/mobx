import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { routes } from 'App/routes';
const { Header, Content, Footer, Sider } = Layout;
const Home = ({ children }) => {
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">Login</span>
            <NavLink to={routes.login.path} activeClassName="active-link">
              Page 2
            </NavLink>{' '}
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">page 1</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">page 2</span>
            <NavLink to={routes.page2.path} activeClassName="active-link">
              Page 2
            </NavLink>{' '}
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="bar-chart" />
            <span className="nav-text">page 4</span>
            {/* <routes.login.component /> */}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            {children}
          </div>
        </Content>
        <Footer
          style={{ textAlign: 'center', position: 'absolute', bottom: 0 }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default withRouter(Home);
