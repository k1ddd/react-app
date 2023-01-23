import { createSlice } from "@reduxjs/toolkit";
import { login } from "../login/asyncActions";

const initialData = {
  token: "",
  userLogin: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  //                        | 'pending' | 'fulfilled' | 'rejected'
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialData,
  reducers: {
    resetLoginStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userLogin = action.payload;
        action.payload.error === undefined
          ? (state.userLogin = action.payload)
          : (state.userLogin = action.payload.error);
        action.payload.error === undefined
          ? (state.status = "succeeded")
          : (state.status = "error");
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetLoginStatus } = authSlice.actions;

export default authSlice.reducer;
