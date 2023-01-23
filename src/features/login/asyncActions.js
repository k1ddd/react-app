import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/API';

export const login = createAsyncThunk('auth/login', async (value) => {
    try {
        const response = await axios.post(API_BASE_URL + 'login', value); //
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const register = createAsyncThunk('auth/register', async (value) => {
    try {
        const response = await axios.post(API_BASE_URL + 'register', value); //
        return response.data;
    } catch (error) {
        console.log(error);
    }
});
