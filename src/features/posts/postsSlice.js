import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/API";
const initialData = {
  posts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  //                        | 'pending' | 'fulfilled' | 'rejected'
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    try {
      const response = await axios.get(API_BASE_URL + "unknown"); //
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: initialData,
  reducers: {},
  extraReducers: (builder) => {
    // cases for User Create
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedPosts = action.payload;
        state.posts.push(...loadedPosts.data);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const { changeTab } = postsSlice.actions;

export default postsSlice.reducer;
