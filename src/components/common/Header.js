import React from 'react';
import { NavLink } from 'react-router-dom';
const Header = () => {
  const activeStyle = { color: '#F15B2A' };
  return (
    <nav>
      <NavLink to="/home" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {'|'}
      <NavLink to="/login" activeStyle={activeStyle} exact>
        Login Page
      </NavLink>
      {'|'}
      <NavLink to="/page2" activeStyle={activeStyle} exact>
        Page 2
      </NavLink>
    </nav>
  );
};
export default Header;
