import {combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import {apiSlice} from '../api/apiSlice';

export const rootReducer = combineReducers({
  user: userSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
