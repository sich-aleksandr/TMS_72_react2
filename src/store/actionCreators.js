import { getCurrentWeather } from "../components/api/apiWether";
import { WeatherActions } from "./constants";

export const fetchStart = () => ({
  type: WeatherActions.fetchStart,
});

export const fetchError = () => ({
  type: WeatherActions.fetchError,
});

export const fetchSuccess = (weather) => ({
  payload: weather,
  type: WeatherActions.fetchSuccess,
});

export const fetchWeather = (city) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const weather = await getCurrentWeather(city);
      dispatch(fetchSuccess(weather));
    } catch {
      dispatch(fetchError());
    }
  };
};
