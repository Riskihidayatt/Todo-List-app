import "./WeatherWidget.css";

const WeatherWidget = ({ weather, loading }) => {
  if (loading) {
    return (
      <div className="weather-widget">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="weather-widget">
        <span>Weather unavailable</span>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <div className="weather-info">
        <span className="temperature">{Math.round(weather.temperature)}°C</span>
        <span className="wind">Wind: {weather.windspeed} km/h</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
