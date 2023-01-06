import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

const Admin = () => {

  return (
    <div>
      <div className="mt-2 mb-3 d-flex align-items-center justify-content-between">
        <h2>Turtle Pizza Admin</h2>
        <div>
          <NavLink to={'dishes'}>Dishes</NavLink>
          <NavLink to={'orders'} className="ms-3">Orders</NavLink>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default Admin;