import React from 'react';
import FetchUsers from './FetchUsers/FetchUsers';
export default function DisplayUsers({ loggedUser }) {
  return (
    <React.Fragment>
      <FetchUsers />
      {/* <h1>{loggedUser}</h1> */}
    </React.Fragment>
  );
}
