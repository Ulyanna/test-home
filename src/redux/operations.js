import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/api';

const token = {
  set(token) {
    api.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    api.instance.defaults.headers.common.Authorization = '';
  },
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await api.getContacts();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { rejectWithValue }) => {
    try {
      const data = await api.addContact(newContact);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.deleteContact(id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await api.registerNewUser(credentials);
      token.set(user.token);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 * После успешного логина добавляем токен в HTTP-заголовок
 */
export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await api.logInUser(credentials);
      token.set(user.token);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/*
 * POST @ /users/logout
 * body: Authorization = Bearer token
 * После успешного логаута, удаляем токен из HTTP-заголовока
 */
export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      await api.logOutUser();
      token.unset();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
/*
 * GET @ /users/current
 * headers: Authorization = Bearer token
 *
 * 1. Забираем токен из стейта через getState()
 * 2. Если токена нет, выходим(отклоняем)
 * 3. Если токен есть, добавляем его в HTTP-заголовок и выполняем операцию
 */
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    console.log(state);
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await api.instance.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
