import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {

  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        if (response && response.data) {
          console.log('Valid data')
          setIsLoading(false)
          setCountries(response.data)
        }
      })
  }, [])

  console.log(isLoading)
  console.log(countries)


  if (!isLoading) {
    console.log("Loaded")
    return (
      <div>
        sad
      </div>
    )
  } else {
    console.log("Loading...")
    return <div>Loading</div>
  }
}



export default App;
