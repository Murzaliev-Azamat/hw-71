import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import Admin from "./containers/Admin/Admin";
import Add from "./containers/Add/Add";
import AdminDishes from "./containers/AdminDishes/AdminDishes";
import AdminOrders from "./containers/AdminOrders/AdminOrders";
import Edit from "./containers/Edit/Edit";
import ClientCart from "./containers/ClientCart/ClientCart";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(
          <Home/>
        )}/>
        <Route path="/admin" element={(
          <Admin/>
        )}>
          <Route path="dishes" element={(
            <AdminDishes/>
          )}/>
          <Route path="orders" element={(
            <AdminOrders/>
          )}/>
        </Route>
        <Route path="/add-dish" element={(
          <Add/>
        )}/>
        <Route path="/edit-dish/:id" element={(
          <Edit/>
        )}/>
        <Route path="/client-order" element={(
          <ClientCart/>
        )}/>
      </Routes>
    </div>
  );
}

export default App;
