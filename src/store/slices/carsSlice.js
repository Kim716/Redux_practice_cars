import { createSlice, nanoid } from "@reduxjs/toolkit";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    searchTerm: "",
    cars: [],
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },

    addCar(state, action) {
      // 假設傳入的資料長這樣
      // action.payload === { name: 'ab, cost: 100 }
      state.cars.push({
        name: action.payload.name,
        cost: action.payload.cost,
        id: nanoid(),
      });
    },

    removeCar(state, action) {
      // 假設傳入的資料長這樣
      // action.payload === 我們想要刪除的那台車的 id
      const updated = state.cars.filter(car => car.id === action.payload)
      state.cars = updated
    },
  },
});

export const { changeSearchTerm, addCar, removeCar } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
