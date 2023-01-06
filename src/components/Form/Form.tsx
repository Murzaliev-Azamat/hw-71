import React, {useState} from 'react';
import {DishApi} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {useAppSelector} from "../../app/hooks";
import {selectAddLoading, selectUpdateLoading} from "../../store/HomeSlice";

interface FormMutation {
  name: string;
  price: string;
  image: string;
}

interface Props {
  onSubmit: (dish: DishApi) => void;
  existingDish?: DishApi | null;
  isLoading?: boolean;
}


const Form: React.FC<Props> = ({onSubmit,existingDish,isLoading= false}) => {
  const updatingLoading = useAppSelector(selectUpdateLoading);
  const addLoading = useAppSelector(selectAddLoading);

  const initialState = existingDish ? {...existingDish, price: existingDish.price.toString()} : {name: '', price: '', image: ''};
  const [dish, setDish] = useState<FormMutation>(initialState);

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setDish(prev => ({
      ...prev,
      [name]: value,
    }))
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: dish.name,
      price: parseInt(dish.price),
      image: dish.image,
    })
  }

  return (
    <form onSubmit={onFormSubmit}>
      <input
        className="d-block mt-2"
        type="text"
        name="name"
        placeholder="Введите имя"
        value={dish.name}
        onChange={onTextFieldChange}
        required
      />
      <input
        className="d-block mt-2"
        type="number"
        name="price"
        placeholder="Введите цену"
        value={dish.price}
        onChange={onTextFieldChange}
        required
      />
      <input
        className="d-block mt-2"
        type="url"
        name="image"
        placeholder="Загрузите фото"
        value={dish.image}
        onChange={onTextFieldChange}
      />
      <img src={dish.image} style={{width: "250px", height: "250px", marginTop: "5px"}} alt=""/>
      <button type="submit" disabled={isLoading} className="d-block btn btn-primary mt-2">
        {updatingLoading || addLoading ? <ButtonSpinner/> : ''}
        Save
      </button>
    </form>
  );
};

export default Form;