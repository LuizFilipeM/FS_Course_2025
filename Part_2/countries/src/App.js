import './index.css';
import Filter from './components/Filter';
import Countrie from './components/Countrie';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [countriesToShow, setCountriesToShow] = useState('');
  const [countries, setCountries] = useState([]);
  
  const promise = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data);
    })

  const filteredCountries = () => {
    return countries.filter(country => country.name.common.toLowerCase().includes(countriesToShow.toLowerCase()))
  }


  return(
    <div>
      <Filter value={countriesToShow} onChange={event => setCountriesToShow(event.target.value)} />
      <Countrie country={filteredCountries()} />
    </div>
  )
}

export default App;
