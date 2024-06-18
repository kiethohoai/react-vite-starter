import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IUserPayload {
  name: string;
  email: string;
}

interface IUserPayloadUpdate {
  id: number;
  email: string;
  name: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

const initialState: {
  listUsers: IUser[];
  isCreateSucess: boolean;
  isUpdateSucess: boolean;
} = {
  listUsers: [],
  isCreateSucess: false,
  isUpdateSucess: false,
};

// fetchListUsers
export const fetchListUsers = createAsyncThunk(
  "users/fetchListUsers",
  async (userId, thunkAPI) => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data;
  },
);

// createNewUser
export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (payload: IUserPayload, thunkAPI) => {
    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify({ ...payload }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUsers());
    }
    return data;
  },
);

// updateUser
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload: IUserPayloadUpdate, thunkAPI) => {
    console.log("🚀CHECK  payload =", payload);
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUsers());
      thunkAPI.dispatch(setIsUpdateSucess());
    }
    return data;
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetIsCreateSucess: (state) => {
      state.isCreateSucess = false;
    },

    setIsUpdateSucess: (state) => {
      state.isUpdateSucess = true;
    },

    resetIsUpdateSucess: (state) => {
      state.isUpdateSucess = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload);
      state.listUsers = action.payload;
    });

    builder.addCase(createNewUser.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload);
      state.isCreateSucess = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetIsCreateSucess, resetIsUpdateSucess, setIsUpdateSucess } =
  userSlice.actions;
export default userSlice.reducer;
