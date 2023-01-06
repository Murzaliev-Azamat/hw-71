import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {Dish, DishApi} from "../types";
import {addDish, deleteDish, fetchDishes, fetchOneDish, updateDish} from "./HomeThunks";


interface DishesState {
  dishes: Dish[] | [];
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  addLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  // selectedContactId: string | null;
  dish: DishApi | null;
  totalPrice: number;
}

const initialState: DishesState = {
  dishes: [],
  fetchAllLoading: false,
  fetchOneLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  // selectedContactId: null,
  dish: null,
  totalPrice: 0,
}

export const HomeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    selectContact: (state, action: PayloadAction<string>) => {
      // state.selectedContactId = action.payload;
    },
    unSelectContact: (state) => {
      // state.selectedContactId = null;
    },
    countTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = state.totalPrice + action.payload;
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
  }
});

export const homeReducer = HomeSlice.reducer;
export const {countTotalPrice, unSelectContact} = HomeSlice.actions;

export const selectDishes = (state: RootState) => state.home.dishes;
export const selectOneDish = (state: RootState) => state.home.dish;
export const selectTotalPrice = (state: RootState) => state.home.totalPrice;
// export const selectSelectedContact = (state: RootState) => state.contacts.contacts.filter(contact => contact.id === state.contacts.selectedContactId)[0];

export const selectFetchAllLoading = (state: RootState) => state.home.fetchAllLoading;
export const selectFetchOneLoading = (state: RootState) => state.home.fetchOneLoading;
export const selectAddLoading = (state: RootState) => state.home.addLoading;
export const selectUpdateLoading = (state: RootState) => state.home.updateLoading;
export const selectDeleteLoading = (state: RootState) => state.home.deleteLoading;
