import { createSlice } from '@reduxjs/toolkit';
import { login, register } from "../login/asyncActions";

const initialData = {
    token: '',
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    //                        | 'pending' | 'fulfilled' | 'rejected'
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialData,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
            
    },
});

export const { changeTab } = authSlice.actions;

export default authSlice.reducer;
