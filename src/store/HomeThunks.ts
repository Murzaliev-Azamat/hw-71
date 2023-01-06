import {createAsyncThunk} from "@reduxjs/toolkit";
import {Dish, DishApi, DishesApiList} from "../types";
import axiosApi from "../axiosApi";

export const fetchDishes = createAsyncThunk<Dish[]>(
  'home/fetchAll',
  async () => {
    const dishesResponse = await axiosApi.get<DishesApiList | null>('/dishes.json');
    const dishes = dishesResponse.data;
    if (dishes === null) {
      return [];
    } else {
      return Object.keys(dishes).map(key => {
        const dish = dishes[key];
        return {
          ...dish,
          id: key
        }
      });
    }
  },
)


export const addDish = createAsyncThunk<void, DishApi>(
  'home/addOneDish',
  async ({name,price,image}) => {
    await axiosApi.post<DishApi>('/dishes.json', {name: name, price: price, image: image});
  }
);

export const fetchOneDish = createAsyncThunk<Dish, string>(
  'home/fetchOne',
  async (id) => {
    const dishResponse = await axiosApi.get<DishApi | null>('dishes/' + id + '.json');
    const dish = dishResponse.data;

    if (dish === null) {
      throw new Error('Not found!')
    }

    return (
        {
          id: id,
          name: dish.name,
          price: dish.price,
          image: dish.image,
        }
      )
  },
)

interface UpdateDishParams {
  id: string;
  dish: DishApi;
}

export const updateDish = createAsyncThunk<void, UpdateDishParams>(
  'home/update',
  async (params) => {
    await axiosApi.put("/dishes/" + params.id + '.json', params.dish);
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'home/deleteDish',
  async (id) => {
    await axiosApi.delete('/dishes/' + id + '.json');
  }
);
