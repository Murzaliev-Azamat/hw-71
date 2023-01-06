import React from 'react';
import {addDishToOrder} from "../../store/HomeSlice";
import {useAppDispatch} from "../../app/hooks";

interface Props {
  name: string;
  image?: string;
  id: string;
  price: number;
}

const ClientDish: React.FC<Props> = ({name,image,id,price}) => {
  const dispatch = useAppDispatch();


  return (
    <div onClick={() => dispatch(addDishToOrder(id))} className="d-flex align-items-center justify-content-between p-2 border mt-2">
      <div className="d-flex align-items-center">
        <img src={image} style={{width: "100px", marginRight: "10px"}} alt=""/>
        <h3>{name}</h3>
      </div>
      <p>{price} KGS</p>
    </div>
  );
};

export default ClientDish;