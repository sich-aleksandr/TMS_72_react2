import { request } from "./request.jsx";

const HOST = "https://api.openweathermap.org/data/2.5";
const TOKEN = `${process.env.REACT_APP_WEATHER_TOKEN}`;

export const getCurrentWeather = (city, units = 'metric') => {
  const url = `${HOST}/weather`;
  const  params = new URLSearchParams({
    q: city,
    units,
    appid: TOKEN,
  }).toString();
  
  return request(url, params);
};
