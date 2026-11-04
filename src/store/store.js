import { configureStore } from '@reduxjs/toolkit';
import { dummyJsonApi } from "../api/dummyJsonApi";
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(dummyJsonApi.middleware), 
});