import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { useContext } from 'react';
import { rootStore } from 'stores/Root';
import { observer } from 'mobx-react';
import { useHistory, withRouter } from 'react-router-dom';
import { routes } from '../../App/routes';
import './Login.css';
// import Header from 'components/common/Header';
const { home } = routes;
const NormalLoginForm = props => {
  const { loading, error, authenticateUser } = useContext(rootStore);
  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    console.log(112, props);
    props.form.validateFields(async (err, values) => {
      if (!err) {
        let a = await authenticateUser(values);
        a && history.push(home.path);
        a && console.log('Received values of form: ', values);
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <React.Fragment>
      {/* <Header /> */}
      <div className="center">
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
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
            {getFieldDecorator('password', {
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
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
};

const WrappedNormalLoginForm = Form.create()(
  withRouter(observer(NormalLoginForm))
);
export default WrappedNormalLoginForm;

// import React, { useContext } from 'react';
// import './Login.scss';
// import { withRouter } from 'react-router-dom';
// import { Form, Icon, Input, Button, Avatar } from 'antd';
// import { rootStore } from 'stores/Root';
// import { observer } from 'mobx-react';
// const Login = props => {
//   console.log(props);
//   const { form, history } = props;
//   const { loading, error, authenticateUser } = useContext(rootStore);
//   console.log(loading, error);
//   const handleSubmit = e => {
//     e.preventDefault();
//     form.validateFields((err, values) => {
//       console.log(values);
//       if (err) {
//         console.log('err');
//         return;
//       }
//       let data = authenticateUser({
//         ...values,
//       });
//       if (data) {
//         console.log(data);
//         history.push('/home');
//       }
//     });
//   };

//   return (
//     <React.Fragment>
//       <div className="center">
//         <div className="login">
//           <div className="login-card">
//             <Avatar size={64} icon="user" />
//             <div className="login-title">Sign in</div>
//             <Form onSubmit={handleSubmit} className="login-form">
//               <Form.Item>
//                 {form.getFieldDecorator('email', {
//                   rules: [
//                     { required: true, message: 'Please input your username!' },
//                   ],
//                 })(
//                   <Input
//                     prefix={
//                       <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
//                     }
//                     placeholder="Username"
//                   />
//                 )}
//               </Form.Item>
//               <Form.Item>
//                 {form.getFieldDecorator('password', {
//                   rules: [
//                     { required: true, message: 'Please input your Password!' },
//                   ],
//                 })(
//                   <Input
//                     prefix={
//                       <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
//                     }
//                     type="password"
//                     placeholder="Password"
//                   />
//                 )}
//               </Form.Item>
//               <Form.Item>
//                 {/* {form.getFieldDecorator('remember', {
//             valuePropName: 'checked',
//             initialValue: true,
//           })(
//             <div className="forgot-rem">
//             <Checkbox>Remember me</Checkbox>
//             <a className="login-form-forgot" href=" ">
//             Forgot password ?
//             </a>
//             </div>
//           )} */}
//                 <div className="reg-submit">
//                   <Button
//                     loading={loading}
//                     type="primary"
//                     htmlType="submit"
//                     className="login-form-button"
//                   >
//                     Sign in
//                   </Button>
//                 </div>
//               </Form.Item>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Form.create()(withRouter(observer(Login)));
