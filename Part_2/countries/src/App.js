import './index.css';
import Filter from './components/Filter';
import Countrie from './components/Countrie';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countriesToShow, setCountriesToShow] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCountry.capitalInfo.latlng[0]}&longitude=${selectedCountry.capitalInfo.latlng[1]}&current=temperature_2m,wind_speed_10m`)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [selectedCountry]);

  const filteredCountries = () => {
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(countriesToShow.toLowerCase()))

    if (filtered.length === 1) {
      setSelectedCountry(filtered[0]);
    }
    return filtered;
  }


  return(
    <div>
      <Filter 
        value={countriesToShow}
        onChange={event => {
          setCountriesToShow(event.target.value)
          setSelectedCountry(null)
        }} />
      
      <Countrie
        country={selectedCountry ? [selectedCountry] : filteredCountries()}
        onShow={setSelectedCountry}
        weather={weather}
      />
    </div>
  )
}

export default App;
