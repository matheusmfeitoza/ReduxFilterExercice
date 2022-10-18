import { createSlice } from "@reduxjs/toolkit";
import data from "../Data";

const slice = createSlice({
  name: "produtos",
  initialState: {
    data,
    filters: {
      colors: [],
      prices: {
        min: 0,
        max: 0,
      },
    },
  },
  reducers: {
    filterColorsAndPrices(state, action) {
      state.filters[action.payload.name] = action.payload.value;
    },
  },
});
export const { filterColorsAndPrices } = slice.actions;
export default slice.reducer;
