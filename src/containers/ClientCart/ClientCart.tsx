import React from 'react';
import {DELIVERY_PRICE} from "../../constants";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {removeDishFromOrder, selectDishes, selectOrder} from "../../store/HomeSlice";
import {Link, useNavigate} from "react-router-dom";
import {OrderApi} from "../../types";
import {addOrder} from "../../store/HomeThunks";

const ClientCart = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  const order = useAppSelector(selectOrder);
  const dishes = useAppSelector(selectDishes);

  const totalPrice = () => {
      return Object.keys(order.dishes).reduce((acc, id) => {
        const dish = dishes.find(dish => dish.id === id);
        if (dish) {
            return acc + dish.price * order.dishes[id];
        }
        return acc;
    }, 0);
  }

  const dishesInfo = [];

  for (let id of Object.keys(order.dishes)) {
      const dish = dishes.find(dish => dish.id === id);

      if (dish) {
          dishesInfo.push(
              <div className="d-flex align-items-center justify-content-between mt-5" key={dish.id}>
                  <div className="d-flex align-items-center justify-content-between">
                      <p className="me-3 m-0">{dish.name}</p>
                      <p className="m-0">x {order.dishes[id]}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                      <p className="m-0 me-2">{dish.price * order.dishes[id]} KGS</p>
                      <button className="btn btn-danger" onClick={() => dispatch(removeDishFromOrder(dish.id))}>Delete</button>
                  </div>
              </div>
          );
      }
  }

    const confirmOrder = async (order: OrderApi) => {
        await dispatch(addOrder(order));
        navigate('/');
    };

  return (
    <div>
      <h2>Your Order</h2>
        {dishesInfo}
      <div className="d-flex align-items-center justify-content-between mt-2">
        <p className="m-0">Delivery</p>
        <p className="m-0">{DELIVERY_PRICE} KGS</p>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-2">
        <p className="m-0">Total</p>
        <p className="m-0">{totalPrice() + DELIVERY_PRICE} KGS</p>
      </div>
        <Link to={"/"} className={"btn btn-danger mt-4 me-2"}>Cancel</Link>
        {Object.keys(order.dishes).length > 0 ? <button className="btn btn-success mt-4" onClick={() => confirmOrder(order)}>Order</button> : ''}
    </div>
  );
};

export default ClientCart;