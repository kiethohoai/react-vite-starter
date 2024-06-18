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
  isDeleteSucess: boolean;
} = {
  listUsers: [],
  isCreateSucess: false,
  isUpdateSucess: false,
  isDeleteSucess: false,
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
    }
    return data;
  },
);

// deleteUser
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (payload: IUserPayloadUpdate, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    thunkAPI.dispatch(fetchListUsers());
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

    resetIsUpdateSucess: (state) => {
      state.isUpdateSucess = false;
    },

    resetIsDeleteSucess: (state) => {
      state.isDeleteSucess = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchListUsers.fulfilled, (state, action) => {
        // Add user to the state array
        // state.entities.push(action.payload);
        state.listUsers = action.payload;
      })

      .addCase(createNewUser.fulfilled, (state, action) => {
        // Add user to the state array
        // state.entities.push(action.payload);
        state.isCreateSucess = true;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        // Add user to the state array
        // state.entities.push(action.payload);
        state.isUpdateSucess = true;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        // Add user to the state array
        // state.entities.push(action.payload);
        state.isDeleteSucess = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetIsCreateSucess, resetIsUpdateSucess, resetIsDeleteSucess } =
  userSlice.actions;
export default userSlice.reducer;
