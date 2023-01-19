import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.scss';
import { getCountryWeather } from './mapSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Popup from '../Popup';
import ReactDOM from 'react-dom';
import withProvider from '../hoc/withProvider';
import { CurrentCountryProps } from './Map.types';
import { MAP_STYLES } from '../../config';

const Map = () => {
  const dispatch = useAppDispatch();
  const countryDetails = useAppSelector(state => state.countries.currentCountry);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(19.3006);
  const [lat, setLat] = useState(52.1246);
  const [bbox, setBbox] = useState<mapboxgl.LngLatBoundsLike>([14.12293, 49.002047, 24.145783, 54.8929396]);

  useEffect(() => {
    const localStorageCountryDetails = localStorage.getItem('countryDetails');

    if (localStorageCountryDetails) {
      const countryDetailsParsed = JSON.parse(localStorageCountryDetails) as CurrentCountryProps;
      const { lng, lat, bbox } = countryDetailsParsed;
      setLng(lng);
      setLat(lat);
      setBbox(bbox);
    }
  }, [])

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: MAP_STYLES,
      center: [lng, lat],
      zoom: 6,
      bounds: bbox as mapboxgl.LngLatBoundsLike
    });
  });

  useEffect(() => {
    if (!map.current) return;

    if (countryDetails.lng) {
      const { lng, lat, bbox } = countryDetails;

      localStorage.setItem('countryDetails', JSON.stringify(countryDetails))
      setLng(lng);
      setLat(lat);
      setBbox(bbox);
    }
  }, [countryDetails]);

  useEffect(() => {
    dispatch(getCountryWeather(lat,lng));
  }, [dispatch, lat, lng])

  useEffect(() => {
    if (!map.current) return;

    map.current.fitBounds(bbox);

    const popupNode = document.createElement('div');

    ReactDOM.render(withProvider(Popup), popupNode);

    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,
      offset: 25,
    }).setDOMContent(popupNode);

    const marker = new mapboxgl.Marker().setLngLat([lng,lat]).setPopup(popup).addTo(map.current);

    return () => {
      marker.remove();
    };
  }, [lng, lat, bbox])

  return <div ref={mapContainer} className="map-container" />

}

export default Map;