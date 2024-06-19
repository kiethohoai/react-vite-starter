import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  mode: string;
} = {
  mode: "light",
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    changeMod: (state, action) => {
      console.log("🚀CHECK  action =", action);
      state.mode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeMod } = appSlice.actions;
export default appSlice.reducer;
