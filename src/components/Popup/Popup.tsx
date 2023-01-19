import { useAppSelector } from '../../hooks';
import './Popup.scss';

const Popup = () => {
  const currentCountryWeather = useAppSelector(state => state.countries.currentCountryWeather);

  return (
    <>
      <p>Temp: {currentCountryWeather?.temp}</p>
      <p>Temp Min: {currentCountryWeather?.tempMin}</p>
      <p>Temp Max: {currentCountryWeather?.tempMax}</p>
      <p>Feels Like: {currentCountryWeather?.feelsLike}</p>
      <p>Humidity: {currentCountryWeather?.humidity}</p>
    </>
  )
  }

export default Popup;