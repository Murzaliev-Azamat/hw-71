import React, {useEffect} from 'react';
import ClientDish from "../../components/ClientDish/ClientDish";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDishes, selectFetchAllLoading} from "../../store/HomeSlice";
import Spinner from "../../components/Spinner/Spinner";
import {fetchDishes} from "../../store/HomeThunks";
import AdminDish from "../../components/AdminDish";
import {Link} from "react-router-dom";

const AdminDishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const fetchAllLoading = useAppSelector(selectFetchAllLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  let info = null;

  if (fetchAllLoading) {
    info = <Spinner/>
  } else {
    info = (
      <>
        {dishes.map((dish) => (
          <AdminDish key={dish.id} name={dish.name} image={dish.image} id={dish.id} price={dish.price}/>
        ))}
      </>
    )
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3>Dishes</h3>
        <Link to={"/add-dish"} className="btn btn-primary">Add new dish</Link>
      </div>
      {info}
    </div>
  );
};

export default AdminDishes;