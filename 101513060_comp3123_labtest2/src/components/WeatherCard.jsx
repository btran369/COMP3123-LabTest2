import React from 'react';

const WeatherCard = ({ data }) => {
  const { name, sys, main, weather, wind } = data;

  const weatherInfo = weather && weather[0];
  const description = weatherInfo?.description ?? '';
  const mainCondition = weatherInfo?.main ?? '';
  const iconCode = weatherInfo?.icon ?? '01d';
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const temp = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const min = Math.round(main.temp_min);
  const max = Math.round(main.temp_max);

  return (
    <section className="weather-card">
      <div className="weather-main">
        <div className="weather-left">
          <p className="weather-location">
            {name}, {sys.country}
          </p>
          <p className="weather-condition">{mainCondition}</p>
          <p className="weather-description">{description}</p>
        </div>

        <div className="weather-right">
          <img src={iconUrl} alt={description} className="weather-icon" />
          <p className="weather-temp">
            {temp}
            <span className="degree">°C</span>
          </p>
          <p className="weather-feels-like">Feels like {feelsLike}°C</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{main.humidity}%</span>
        </div>
        <div className="detail">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{main.pressure} hPa</span>
        </div>
        <div className="detail">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{wind.speed} m/s</span>
        </div>
        <div className="detail">
          <span className="detail-label">Min / Max</span>
          <span className="detail-value">
            {min}° / {max}°
          </span>
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;
