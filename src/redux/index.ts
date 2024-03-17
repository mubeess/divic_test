import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {rootReducer} from './reducers';
import {apiSlice} from './api/apiSlice';
import {setupListeners} from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
setupListeners(store.dispatch);
export default store;
