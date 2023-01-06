import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {DishApi} from "../../types";
import {addDish} from "../../store/HomeThunks";
import Form from "../../components/Form/Form";
import {useNavigate} from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const dispatch= useAppDispatch();

  const add = async (dish: DishApi) => {
    await dispatch(addDish(dish));
    navigate('/admin/dishes');
  };

  return (
    <div>
      <h4 className="mt-2 mb-2">Add new meal</h4>
      <Form onSubmit={add}/>
    </div>
  );
};

export default Add;