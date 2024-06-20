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
  isDeletePostSuccess: boolean;
} = {
  listBlogs: [],
  isCreatePostSuccess: false,
  isUpdatePostSuccess: false,
  isDeletePostSuccess: false,
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

// deleteBlogPost
export const deleteBlogPost = createAsyncThunk(
  "blogs/deleteBlogPost",
  async (payload: IBlogs, thunkAPI) => {
    console.log("🚀CHECK  payload =", payload);
    const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    thunkAPI.dispatch(fetchListBlogs());
    return data;
  },
);

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

    resetIsDeletePostSuccess(state) {
      state.isDeletePostSuccess = false;
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
      })

      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        // Add user to the state array
        // state.entities.push(action.payload);
        state.isDeletePostSuccess = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  resetIsCreatePostSuccess,
  resetIsUpdatePostSuccess,
  resetIsDeletePostSuccess,
} = blogSlice.actions;
export default blogSlice.reducer;
