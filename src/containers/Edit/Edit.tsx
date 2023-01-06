import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Form from "../../components/Form/Form";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectFetchOneLoading} from "../../store/HomeSlice";
import { DishApi} from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import {fetchOneDish, updateDish} from "../../store/HomeThunks";
import {selectOneDish} from "../../store/HomeSlice";

const Edit = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dish = useAppSelector(selectOneDish);
  const fetchOneLoading = useAppSelector(selectFetchOneLoading);


  useEffect(() => {
    if (id) {
      dispatch(fetchOneDish(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (dish: DishApi) => {
    if (id) {
      await dispatch(updateDish({id, dish}));
      navigate('/admin/dishes');
    }
  };

  return (
    <>
      <div>
        {dish && (
          <>
            <h4 className="mt-2 mb-2">Edit meal</h4>
            {fetchOneLoading ? <Spinner/> : <Form existingDish={dish} onSubmit={onSubmit}/>}
          </>)}
      </div>
    </>
  );
};

export default Edit;