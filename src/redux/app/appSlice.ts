import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  mode: boolean;
} = {
  mode: false,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    changeMod: (state, action) => {
      state.mode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeMod } = appSlice.actions;
export default appSlice.reducer;
