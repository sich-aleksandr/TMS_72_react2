import React from "react";
import _debounce from "lodash/debounce";
import './weather.modules.css';
import { Spinner } from './spinner/spinner.jsx'
import { LOAD_STATUSES } from "./constants.jsx";
import { getCurrentWeather } from "../api/apiWether.jsx";

export default class Weather extends React.Component {
  state = {
    city: " ",
    data: {},
    loadStatus: LOAD_STATUSES.UNKNOWN,
  };

  onChangeCity = ({ target }) => {
    this.setState({ city: `${target.value}` });
  };

  fetchWeather = (city) => {
    this.setState({ loadStatus: LOAD_STATUSES.LOADING });

    if (city !== "") {
      getCurrentWeather(city)
        .then((data) => {
          this.setState({ loadStatus: LOAD_STATUSES.LOADED, data });
        })
        .catch(() => {
          this.setState({ loadStatus: LOAD_STATUSES.ERROR, data: {} });
        });
    } else {
      this.setState({ loadStatus: LOAD_STATUSES.UNKNOWN, data: {} });
    }
  };

  fetchWeatherDebounced = _debounce(() => {
    this.fetchWeather(this.state.city);
  }, 1000);

  componentDidUpdate(prevProps, prevState) {
    if (prevState.city !== this.state.city) {
      this.fetchWeatherDebounced();
    }
  }

  render() {
    return (
      <div className="weather">
        <input
          type=""
          placeholder="Введите город"
          onChange={this.onChangeCity}
        />
        <p>{this.state.loadStatus}</p>
        {this.state.loadStatus === LOAD_STATUSES.UNKNOWN && (
          <p>Введите город</p>
        )}
        {this.state.loadStatus === LOAD_STATUSES.ERROR && (
          <p>Не удалось получить данные, попробуйте изменить запрос</p>
        )}
        {this.state.loadStatus === LOAD_STATUSES.LOADING && <Spinner />}
        {this.state.loadStatus === LOAD_STATUSES.LOADED && (
          <table className="newstyle">
            <tbody>
              <tr>
                <th>Город</th>
                <th>{this.state.data.name}</th>
              </tr>
              <tr>
                <td>Температура</td>
                <td>{this.state.data.main.temp}</td>
              </tr>
              <tr>
                <td>Ощущаеться</td>
                <td>{this.state.data.main.feels_like}</td>
              </tr>
              <tr>
                <td>Давление</td>
                <td>{this.state.data.main.pressure}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
