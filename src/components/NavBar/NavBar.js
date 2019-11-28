import { Layout, Menu, Button } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
// import 'antd/dist/antd.css';
const { Header } = Layout;
const activeStyle = { color: 'red' };
const Navbar = props => {
  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="white"
          mode="horizontal"
          // defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px', width: 'auto' }}
        >
          <Menu.Item key="4" style={{ float: 'right' }}>
            <div>
              {console.log(props.loggedin)}
              {props.loggedin ? (
                <Button type="primary" onClick={props.logout}>
                  LOGOUT
                </Button>
              ) : null}
            </div>
          </Menu.Item>
          <Menu.Item key="1">
            <NavLink to="/home" activeStyle={activeStyle} exact>
              HOME PAGE
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/fetchUsers" activeStyle={activeStyle} exact>
              USERS PAGE
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/fetchPools" activeStyle={activeStyle} exact>
              POOLS PAGE
            </NavLink>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
