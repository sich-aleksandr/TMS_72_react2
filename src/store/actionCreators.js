import { getCurrentPoint } from "../components/api/apiStar";
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

export const fetchWeather = (point, id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const weather = await getCurrentPoint(point, id);
      dispatch(fetchSuccess(weather));
    } catch {
      dispatch(fetchError());
    }
  };
};
