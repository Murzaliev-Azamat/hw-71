import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDishes, selectFetchAllLoading} from "../../store/HomeSlice";
import Spinner from "../../components/Spinner/Spinner";
import {deleteDish, fetchDishes} from "../../store/HomeThunks";
import AdminDish from "../../components/AdminDish";
import {Link} from "react-router-dom";

const AdminDishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const fetchAllLoading = useAppSelector(selectFetchAllLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const removeDish = async (id: string) => {
    await dispatch(deleteDish(id));
    await dispatch(fetchDishes());
  }

  let info = null;

  if (fetchAllLoading) {
    info = <Spinner/>
  } else {
    info = (
      <>
        {dishes.map((dish) => (
          <AdminDish key={dish.id} name={dish.name} image={dish.image} id={dish.id} price={dish.price} onDelete={removeDish}/>
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