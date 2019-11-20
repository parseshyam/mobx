import React from 'react';
import { Button } from 'antd';
import './LoginHeader.scss';

const LoginHeader = () => {
  return (
    <div className="login-header">
      <div className="header-content">
        <div className="login-logo">Logo</div>
        <div className="login-menu">
          <div className="public-pages">
            <span className="menu-option">Home</span>
            <span className="menu-option">About us</span>
            <span className="menu-option">Contact</span>
            <span className="menu-option">Blog</span>
            <span className="menu-option">App</span>
          </div>
          <div className="link-buttons">
            <Button className="signup-btn">Sign up</Button>
            <Button type="primary">Sign in</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;
