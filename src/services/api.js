import axios from "axios";

// Free APIs that don't require API keys
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const TIME_API_URL = "https://worldtimeapi.org/api/timezone/Asia/Jakarta";

export const fetchWeather = async () => {
  try {
    const response = await axios.get(
      `${WEATHER_API_URL}?latitude=-6.2088&longitude=106.8456&current_weather=true`
    );
    return {
      temperature: response.data.current_weather.temperature,
      windspeed: response.data.current_weather.windspeed,
      time: response.data.current_weather.time,
    };
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

export const fetchWorldTime = async () => {
  try {
    const response = await axios.get(TIME_API_URL);
    return {
      datetime: response.data.datetime,
      timezone: response.data.timezone,
      utc_offset: response.data.utc_offset,
    };
  } catch (error) {
    throw new Error("Failed to fetch time data");
  }
};
