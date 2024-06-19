import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IBlogs {
  id: number;
  title: string;
  author: string;
  content: string;
}

interface IDataCreate {
  title: string;
  content: string;
  author: string;
}

const initialState: {
  listBlogs: IBlogs[];
  isCreatePostSuccess: boolean;
} = {
  listBlogs: [],
  isCreatePostSuccess: false,
};

// fetchListBlogs
export const fetchListBlogs = createAsyncThunk(
  "users/fetchListBlogs",
  async (payload, thunkAPI) => {
    const res = await fetch("http://localhost:8000/blogs");
    const data = await res.json();
    return data;
  },
);

// createABlogPost
export const createABlogPost = createAsyncThunk(
  "users/createABlogPost",
  async (payload: IDataCreate, thunkAPI) => {
    const res = await fetch("http://localhost:8000/blogs", {
      method: "POST",
      body: JSON.stringify({ ...payload }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListBlogs());
    }
    return data;
  },
);

// updateUser
// export const updateUser = createAsyncThunk(
//   "users/updateUser",
//   async (payload: IUserPayloadUpdate, thunkAPI) => {
//     const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         email: payload.email,
//         name: payload.name,
//       }),
//       headers: {
//         "content-type": "application/json",
//       },
//     });

//     const data = await res.json();
//     if (data && data.id) {
//       thunkAPI.dispatch(fetchListUsers());
//     }
//     return data;
//   },
// );

// deleteUser
// export const deleteUser = createAsyncThunk(
//   "users/deleteUser",
//   async (payload: IUserPayloadUpdate, thunkAPI) => {
//     const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
//       method: "DELETE",
//       headers: {
//         "content-type": "application/json",
//       },
//     });

//     const data = await res.json();
//     thunkAPI.dispatch(fetchListUsers());
//     return data;
//   },
// );

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetisCreatePostSuccess(state) {
      state.isCreatePostSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchListBlogs.fulfilled, (state, action) => {
        // Add user to the state array
        // state.entities.push(action.payload);
        state.listBlogs = action.payload;
      })

      .addCase(createABlogPost.fulfilled, (state, action) => {
        // Add user to the state array
        // state.entities.push(action.payload);
        state.isCreatePostSuccess = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetisCreatePostSuccess } = blogSlice.actions;
export default blogSlice.reducer;
