import React, { useState, useEffect } from "react";
// import { Tab, Row, Col, Nav, TabContainer } from 'react-bootstrap';
import './App.css';
import WeatherInfo from "./component/WeatherInfo.js";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    console.log({ response });
    const weatherData = await response.json();
    setWeather(weatherData)
  }

  useEffect(() => {
    const getWeatherByCurrentLocation = async (lat, lon) => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      console.log({ response });
      const weatherData = await response.json();
      setWeather(weatherData)
    }


    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  }, []);

  console.log(weather)


  if (!weather) {
    return <h1>Loading</h1>
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <WeatherInfo weather={weather} />
      <div>
        <button onClick={() => getWeatherByCurrentLocation(21.0278, 105.8342)}>Hanoi</button>
        <button onClick={() => getWeatherByCurrentLocation(40.712667022068445, -74.00670067020043)}>NewYork</button>

      </div>
    </div>
  );
}




export default App;
