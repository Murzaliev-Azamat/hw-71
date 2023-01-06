import React, {useEffect} from 'react';
import ClientDish from "../../components/ClientDish/ClientDish";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDishes, selectFetchAllLoading, selectOrder} from "../../store/HomeSlice";
import {fetchDishes} from "../../store/HomeThunks";
import Spinner from "../../components/Spinner/Spinner";
import {Link} from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const order = useAppSelector(selectOrder);
  const fetchAllLoading = useAppSelector(selectFetchAllLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const totalPrice = () => {
    const totalPrice = Object.keys(order.dishes).reduce((acc, id) => {
      const dish = dishes.find(dish => dish.id === id);
      if (dish) {
        return acc + dish.price * order.dishes[id];
      }
      return acc;
    }, 0);
    return totalPrice;
  }

  let info = null;

  if (fetchAllLoading) {
    info = <Spinner/>
  } else {
    info = (
      <>
        {dishes.map((dish) => (
          <ClientDish key={dish.id} name={dish.name} image={dish.image} id={dish.id} price={dish.price}/>
        ))}
      </>
    )
  }

  return (

    <div>
      <div className="mt-2 mb-3">
        <h2>Turtle Pizza</h2>
      </div>
      {info}
      <div className="d-flex align-items-center justify-content-between p-2 mt-2">
        <h2 className="m-0">Order total: {totalPrice()} KGS</h2>
        <Link to={"/client-order"} className="btn btn-primary">Checkout</Link>
      </div>
    </div>
  );
};

export default Home;