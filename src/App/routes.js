import React, { Suspense, lazy } from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export const history = createBrowserHistory();

export const routes = {
  home: {
    path: '/home',
    exact: true,
    component: lazy(() => import('pages/HomePage/Home')),
  },
  login: {
    path: '/login',
    exact: true,
    component: lazy(() => import('pages/Login/Login')),
  },
  signup: {
    path: '/signup',
    exact: true,
    component: lazy(() => import('pages/Signup/Signup')),
  },
  page1: {
    path: '/Page1',
    exact: true,
    component: lazy(() => import('pages/Page1/Page1')),
  },
  page2: {
    path: '/Page2',
    exact: true,
    component: lazy(() => import('pages/Page2/Page2')),
  },
  page3: {
    path: '/Page3',
    exact: true,
    component: lazy(() => import('pages/Page3/Page3')),
  },
};

const renderRoutes = Object.entries(routes);

export const Routes = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            height: '100vh',
            margin: 0,
          }}
        >
          <Spin indicator={antIcon} />
        </div>
      }
    >
      <BrowserRouter history={createBrowserHistory}>
        <Switch>
          {renderRoutes.map(([key, val]) => (
            <Route
              key={key}
              path={val.path}
              exact={val.exact}
              component={val.component}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};
