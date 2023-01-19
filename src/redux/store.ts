import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
// import { countryApi } from '../components/List/listSlice';
// import countriesSlice from '../components/List/listSlice';

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>