import React from 'react';
import {Link} from "react-router-dom";

interface Props {
  name: string;
  image?: string;
  id: string;
  price: number;
  onDelete: (id: string) => void;
}

const AdminDish: React.FC<Props> = ({name,image,id,price, onDelete}) => {
  return (
    <div className="d-flex align-items-center justify-content-between p-2 border mt-2">
      <div className="d-flex align-items-center">
        <img src={image} style={{width: "100px", marginRight: "10px"}} alt=""/>
        <h3>{name}</h3>
      </div>
      <div className="d-flex align-items-center">
        <p className="me-3 m-0">{price} KGS</p>
        <Link to={"/edit-dish/" + id} className="me-3 btn btn-primary">Edit</Link>
        <button onClick={() => onDelete(id)} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default AdminDish;