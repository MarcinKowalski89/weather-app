import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { MAP_TOKEN, WEATHER_TOKEN, MAP_ROOT_URL, WEATHER_ROOT_URL } from '../../config';
import axios, { AxiosError } from 'axios';
import { MapStateProps } from './Map.types';

const initialState = {
  currentCountry: {
    bbox: [0, 0, 0, 0],
    lng: 0,
    lat: 0
  },
  currentCountryWeather: {
    temp: 0,
    feelsLike: 0,
    tempMin: 0,
    tempMax: 0,
    humidity: 0
  }
} as MapStateProps;

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    countryDetails: (state, action) => {
      const { bbox, center } = action.payload.features[0];

      state.currentCountry = {
        bbox,
        lng: center[0],
        lat: center[1],
      }
    },
    currentCountryWeather: (state, action) => {
      const { temp, feels_like, temp_min, temp_max, humidity } = action.payload.main;

      state.currentCountryWeather = {
        temp,
        feelsLike: feels_like,
        tempMin: temp_min,
        tempMax: temp_max,
        humidity: humidity
      }
    }
  }
});

export const getCountryWeather = (lat: number, lon: number) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${WEATHER_ROOT_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_TOKEN}`);

    dispatch(currentCountryWeather(response.data))
  } catch (err) {
    const error = err as AxiosError;

    throw new Error(error.message);
  }
}

export const getCountryDetails = (name: string, code: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${MAP_ROOT_URL}/${name}.json?types=country&country=${code}&access_token=${MAP_TOKEN}`);

    dispatch(countryDetails(response.data))
  } catch (err) {
    const error = err as AxiosError;

    throw new Error(error.message);
  }
};

export const { countryDetails, currentCountryWeather } = countriesSlice.actions

export default countriesSlice.reducer