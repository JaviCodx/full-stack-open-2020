import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import CountriesList from './components/CountriesList';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    console.log('effect');
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      console.log('promise fulfilled');
      if (response && response.data) {
        console.log('Valid data');
        setCountries(response.data);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <>
      {isLoading ? (
        'Loading'
      ) : (
        <div>
          <Filter
            countries={countries}
            setCountries={setCountries}
            countriesToShow={countriesToShow}
            setCountriesToShow={setCountriesToShow}
          />
          <CountriesList
            countriesToShow={countriesToShow}
            setCountriesToShow={setCountriesToShow}
          />
        </div>
      )}
    </>
  );
};

export default App;
