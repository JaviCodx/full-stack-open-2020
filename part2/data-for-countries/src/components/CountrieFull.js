import { useState, useEffect } from "react";
import axios from "axios";
const CountrieFull = ({ countrie }) => {
  const flag = countrie.flag;
  const flagStyle = {
    width: "200px",
  };

  return (
    <div>
      <h1>{countrie.name}</h1>
      <div>
        <p>Capital: {countrie.capital} </p>
        <p>Population: {countrie.population} </p>
      </div>
      <h2>Languages</h2>
      <ul>
        {countrie.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img style={flagStyle} src={flag} alt="flag"></img>
      <WeatherData capital={countrie.capital} />
    </div>
  );
};

const WeatherData = ({ capital }) => {
  console.log("WeahterData", capital);

  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    console.log("effect in WeatherData");
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${token}&query=${capital}`
      )
      .then((response) => {
        console.log("promise fulfilled in WeatherData");
        if (response && response.data) {
          console.log("Valid data in WeatherData");
          console.log(response.data);
          setWeather(response.data);
          setIsLoading(false);
        }
      });
  }, []);

  if (!isLoading) {
    const icon = weather.current.weather_icons;
    const description = weather.current.weather_descriptions;
    const windSpeed = weather.current.wind_speed;
    const windDirection = weather.current.wind_dir;

    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>
          <strong>Temperature: </strong>
          {weather.current.temperature} celsius
        </p>
        <p>
          <strong>Conditions:</strong> {description}
        </p>
        <img src={icon} alt="description icon"></img>
        <p>
          <strong>Wind: </strong>
          {windSpeed} mph <strong>Direction: </strong>
          {windDirection}
        </p>
      </div>
    );
  } else {
    return <div>Loading Weather...</div>;
  }
};

export default CountrieFull;
