import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { userAPI } from "./userAPI";

// First, create the thunk
export const fetchListUsers = createAsyncThunk(
  "users/fetchListUsers",
  async (userId, thunkAPI) => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data;
  },
);

export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (payload: IUserPayload, thunkAPI) => {
    console.log("🚀CHECK  payload =", payload);

    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify({ ...payload }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  },
);
interface IUserPayload {
  name: string;
  email: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

const initialState: {
  listUsers: IUser[];
} = {
  listUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload);
      console.log("🚀CHECK  action =", action);
      state.listUsers = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;
export default userSlice.reducer;
