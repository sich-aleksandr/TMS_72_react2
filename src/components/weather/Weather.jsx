import React from "react";
import _debounce from "lodash/debounce";
import { connect } from "react-redux";
import { WeatherSelectors, WeatherAC } from "../../store";
import "./weather.modules.css";
import { Spinner } from "./spinner/spinner.jsx";

class WeatherMain extends React.Component {
  state = {
    city: "Minsk",
  };

  onChangeCity = ({ target }) => {
    this.setState({ city: `${target.value}` });
  };

  fetchWeatherDebounced = _debounce(() => {
    this.props.getWeather(this.state.city);
  }, 1000);

  componentDidMount() {
    this.fetchWeatherDebounced();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.city !== this.state.city) {
      this.fetchWeatherDebounced();
    }
  }

  render() {
    const { data, isLoading, isLoaded, isError } = this.props;

    return (
      <div className="weather">
        <input
          type=""
          value={this.state.city}
          placeholder="Введите город"
          onChange={this.onChangeCity}
        />
        <p>{this.props.loadStatus}</p>
        {isError && (
          <p>Не удалось получить данные, попробуйте изменить запрос</p>
        )}
        {isLoading && <Spinner />}
        {isLoaded && (
          <table className="newstyle">
            <tbody>
              <tr>
                <th>Город</th>
                <th>{data.name}</th>
              </tr>
              <tr>
                <td>Температура</td>
                <td>{data.main.temp}</td>
              </tr>
              <tr>
                <td>Ощущаеться</td>
                <td>{data.main.feels_like}</td>
              </tr>
              <tr>
                <td>Давление</td>
                <td>{data.main.pressure}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: WeatherSelectors.getWeather(state),
    isLoading: WeatherSelectors.isLoading(state),
    isLoaded: WeatherSelectors.isLoaded(state),
    isError: WeatherSelectors.isError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWeather: (city) => dispatch(WeatherAC.fetchWeather(city)),
  };
};

export const Weather = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherMain);
