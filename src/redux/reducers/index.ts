import { combineReducers } from '@reduxjs/toolkit';
import countriesSlice from '../../components/Map/mapSlice';


const rootReducer = {
  countries: countriesSlice
}

export default combineReducers(rootReducer);