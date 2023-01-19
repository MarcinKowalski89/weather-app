export type CurrentCountryProps = {
  bbox: mapboxgl.LngLatBoundsLike,
  lng: number,
  lat: number
};

export type CurrentCountryWeatherProps = {
  temp: number,
  feelsLike: number,
  tempMin: number,
  tempMax: number,
  humidity: number
}

export type MapStateProps = {
  currentCountry: CurrentCountryProps,
  currentCountryWeather: CurrentCountryWeatherProps
};