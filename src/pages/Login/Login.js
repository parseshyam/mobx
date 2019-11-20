import React, { useContext } from 'react';
import './Login.scss';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Avatar } from 'antd';
import SideNavBar from 'components/SideNavBar/SideNavBar';
import { rootStore } from 'stores/Root';
import { observer } from 'mobx-react';
const Login = ({ form }) => {
  const { authenticateUser, loading, error } = useContext(rootStore);
  console.log(loading, error);
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      console.log(values);
      if (err) {
        console.log('err');

        return;
      }
      authenticateUser({
        ...values,
      });
    });
  };

  return (
    <React.Fragment>
      <SideNavBar />
      <div className="login">
        <div className="login-card">
          <Avatar size={64} icon="user" />
          <div className="login-title">Sign in</div>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {form.getFieldDecorator('email', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {/* {form.getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <div className="forgot-rem">
                  <Checkbox>Remember me</Checkbox>
                  <a className="login-form-forgot" href=" ">
                    Forgot password ?
                  </a>
                </div>
              )} */}
              <div className="reg-submit">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Sign in
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form.create()(withRouter(observer(Login)));
