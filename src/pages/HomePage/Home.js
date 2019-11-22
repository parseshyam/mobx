import DisplayUsers from '../DisplayUsers';
import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { Switch } from 'antd';
import SideNavBar from '../../components/SideNavBar/SideNavBar';
const Home = ({ history }) => {
  const [checkAuth, setAuth] = useState(false);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    console.log('HERE');
    try {
      const accessToken = localStorage.getItem('accessToken');
      const verifyToken = jwt.verify(accessToken, 'accessToken');
      if (verifyToken) {
        setAuth(true);
        setLogout(false);
        setAdmin(verifyToken.payload.userEmail);
      }
      console.log(verifyToken.payload.userEmail);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLogout(true);
    }
  }, []);

  useEffect(() => {
    if (logout === true) {
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
    }
  }, [logout]);

  return (
    <React.Fragment>
      {logout ? history.push('/login') : null}
      <div className="m-5">
        <Switch
          size="default"
          checkedChildren="Logout"
          unCheckedChildren="Login"
          checked={!logout}
          onChange={() => setLogout(true)}
        />
        {/* {!logout ? (
          <button className="btn btn-primary" onClick={() => setLogout(true)}>
            LOG OUT
          </button>
        ) : null} */}
      </div>
      <div>{error !== null ? error : 'Correct Signature'}</div>
      <div>
        {!checkAuth ? (
          'You need to login first'
        ) : (
          <div className="container">
            <DisplayUsers loggedUser={admin} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
