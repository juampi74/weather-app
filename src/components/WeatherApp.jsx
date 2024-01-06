import { useState } from "react";
import MapView from "./MapView.jsx";

const WeatherApp = () => {
  const basicUrl = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "6307556e70e4fea53aa019e6c89d30d6";

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather();
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${basicUrl}?q=${city}&appid=${apiKey}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <h1>Weather App</h1>
      <form onSubmit={onSubmit} className="d-flex align-items-center justify-content-between">
        <input type="text" value={city} onChange={handleCityChange} className="form-control" />
        <button type="submit" className="btn btn-primary mx-2">Search</button>
      </form>
      {weatherData ? (
        <div className=" mt-3">
          <h2>
            {weatherData.name} ({weatherData.sys.country})
          </h2>
          <p className="lead">{`Temperature: ${(weatherData.main.temp - 273.15).toFixed(
            1
          )}°C (RealFeel: ${(weatherData.main.feels_like - 273.15).toFixed(
            1
          )}°C)`}</p>
          <p className="lead">Humidity: {`${weatherData.main.humidity}%`}</p>
          <p className="lead">Pressure: {`${weatherData.main.pressure} hPa`}</p>
          <div className="d-flex align-items-center">
            <p className="lead mb-0">
              Condition: {`${weatherData.weather[0].description
                .charAt(0)
                .toUpperCase()}${weatherData.weather[0].description.slice(1)}`}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
          </div>
          <div>
            <MapView
              name={weatherData.name}
              lat={weatherData.coord.lat}
              lon={weatherData.coord.lon}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherApp;
