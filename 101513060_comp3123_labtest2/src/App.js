import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

const DEFAULT_CITY = 'Toronto';

function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const fetchWeather = async (cityName) => {
    if (!cityName || !apiKey) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            q: cityName,
            appid: apiKey,
            units: 'metric',
          },
        }
      );
      setWeather(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('City not found. Please try a different name.');
      } else {
        setError('Unable to fetch weather. Please try again.');
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch default city on first load
  useEffect(() => {
    fetchWeather(DEFAULT_CITY);
  }, []);

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (
    <div className="app">
      <div className="app-overlay" />
      <main className="app-content">
        <h1 className="app-title">Weather Now</h1>

        <SearchBar
          city={city}
          onCityChange={setCity}
          onSearch={handleSearch}
        />

        {loading && <p className="info-text">Loading current weather...</p>}
        {error && <p className="info-text error">{error}</p>}
        {!loading && !error && weather && <WeatherCard data={weather} />}

        <footer className="app-footer">
          Powered by OpenWeatherMap
        </footer>
      </main>
    </div>
  );
}

export default App;
