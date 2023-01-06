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

export interface Order {
  id: string;
  dishes: {
    [id: string]: number;
  }
}

export interface OrderApi {
  dishes: {
    [id: string]: number;
  }
}

export interface OrderApiList {
  [id: string]: OrderApi;
}

interface FormMutation {
  name: string;
  image: string;
  price: string;
}
