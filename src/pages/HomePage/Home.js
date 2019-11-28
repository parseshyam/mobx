import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'antd';
import NavBar from 'components/NavBar/NavBar';
import { useHistory } from 'react-router-dom';
import { rootStore } from 'stores/Root';

const Home = props => {
  const { LoggedIn } = useContext(rootStore);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState();
  let history = useHistory();

  useEffect(() => {
    if (!LoggedIn);
    const accessToken =
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken');
    if (!accessToken) history.push('/');
    setLoggedIn(true);
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log(history);
    history.push('/');
  };

  return (
    <React.Fragment>
      <NavBar loggedin={loggedIn} logout={logout} />
      <div className="m-5">
        <div className="m-2">
          {error !== null ? error : 'Signature verified !'}
          <div>
            <Button type="primary" onClick={logout}>
              LOGOUT
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
