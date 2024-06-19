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
  isUpdatePostSuccess: boolean;
} = {
  listBlogs: [],
  isCreatePostSuccess: false,
  isUpdatePostSuccess: false,
};

// fetchListBlogs
export const fetchListBlogs = createAsyncThunk(
  "blogs/fetchListBlogs",
  async (payload, thunkAPI) => {
    const res = await fetch("http://localhost:8000/blogs");
    const data = await res.json();
    return data;
  },
);

// createABlogPost
export const createABlogPost = createAsyncThunk(
  "blogs/createABlogPost",
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

// updateBlogPost
export const updateBlogPost = createAsyncThunk(
  "blogs/updateBlogPost",
  async (payload: IBlogs, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: payload.title,
        content: payload.content,
        author: payload.author,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    thunkAPI.dispatch(fetchListBlogs());
    return data;
  },
);

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
    resetIsCreatePostSuccess(state) {
      state.isCreatePostSuccess = false;
    },

    resetIsUpdatePostSuccess(state) {
      state.isUpdatePostSuccess = false;
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
      })

      .addCase(updateBlogPost.fulfilled, (state, action) => {
        // Add user to the state array
        // state.entities.push(action.payload);
        state.isUpdatePostSuccess = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetIsCreatePostSuccess, resetIsUpdatePostSuccess } =
  blogSlice.actions;
export default blogSlice.reducer;
