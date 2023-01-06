export interface Dish {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface DishApi {
  name: string;
  image: string;
  price: number;
}

export interface DishesApiList {
  [id: string]: DishApi;
}

interface FormMutation {
  name: string;
  image: string;
  price: string;
}
