import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {Dish, DishApi, Order, OrderApi} from "../types";
import {
  addDish,
  addOrder,
  completeOrder,
  deleteDish,
  fetchDishes,
  fetchOneDish,
  fetchOrders,
  updateDish
} from "./HomeThunks";


interface DishesState {
  dishes: Dish[] | [];
  fetchAllLoading: boolean;
  fetchAllOrdersLoading: boolean;
  fetchOneLoading: boolean;
  addLoading: boolean;
  addOrderLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  completeOrderLoading: boolean;
  dish: DishApi | null;
  order: OrderApi;
  orders: Order[];
}

const initialState: DishesState = {
  dishes: [],
  fetchAllLoading: false,
  fetchAllOrdersLoading: false,
  fetchOneLoading: false,
  addLoading: false,
  addOrderLoading: false,
  updateLoading: false,
  deleteLoading: false,
  completeOrderLoading: false,
  dish: null,
  order: {
    dishes: {}
  },
  orders: []
}

export const HomeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    addDishToOrder: (state, action: PayloadAction<string>) => {
      const dish = state.order.dishes[action.payload];
      if (dish) {
        state.order.dishes[action.payload]++;
      } else {
        state.order.dishes[action.payload] = 1;
      }
    },
    removeDishFromOrder: (state, action: PayloadAction<string>) => {
      const dish = state.order.dishes[action.payload];
      if (dish) {
        delete state.order.dishes[action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      state.dishes = action.payload;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchOneDish.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneDish.fulfilled, (state, action) => {
      state.fetchOneLoading = false;
      state.dish = action.payload;
    });
    builder.addCase(fetchOneDish.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(updateDish.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateDish.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateDish.rejected, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(deleteDish.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteDish.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteDish.rejected, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(addDish.pending, (state) => {
      state.addLoading = true;
    });
    builder.addCase(addDish.fulfilled, (state) => {
      state.addLoading = false;
    });
    builder.addCase(addDish.rejected, (state) => {
      state.addLoading = false;
    });
    builder.addCase(addOrder.pending, (state) => {
      state.addOrderLoading = true;
    });
    builder.addCase(addOrder.fulfilled, (state) => {
      state.addOrderLoading = false;
      state.order.dishes = {};
    });
    builder.addCase(addOrder.rejected, (state) => {
      state.addOrderLoading = false;
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.fetchAllOrdersLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.fetchAllOrdersLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.fetchAllOrdersLoading = false;
    });
    builder.addCase(completeOrder.pending, (state) => {
      state.completeOrderLoading = true;
    });
    builder.addCase(completeOrder.fulfilled, (state) => {
      state.completeOrderLoading = false;
    });
    builder.addCase(completeOrder.rejected, (state) => {
      state.completeOrderLoading = false;
    });
  }
});

export const homeReducer = HomeSlice.reducer;
export const {addDishToOrder, removeDishFromOrder} = HomeSlice.actions;

export const selectDishes = (state: RootState) => state.home.dishes;
export const selectOrders = (state: RootState) => state.home.orders;
export const selectOneDish = (state: RootState) => state.home.dish;
export const selectOrder = (state: RootState) => state.home.order;
// export const selectSelectedContact = (state: RootState) => state.contacts.contacts.filter(contact => contact.id === state.contacts.selectedContactId)[0];

export const selectFetchAllLoading = (state: RootState) => state.home.fetchAllLoading;
export const selectFetchAllOrdersLoading = (state: RootState) => state.home.fetchAllOrdersLoading;
export const selectFetchOneLoading = (state: RootState) => state.home.fetchOneLoading;
export const selectAddLoading = (state: RootState) => state.home.addLoading;
export const selectUpdateLoading = (state: RootState) => state.home.updateLoading;
export const selectDeleteLoading = (state: RootState) => state.home.deleteLoading;
export const selectCompleteOrderLoading = (state: RootState) => state.home.completeOrderLoading;
