import React from "react";
import _debounce from "lodash/debounce";
import { connect } from "react-redux";
import { WeatherSelectors, WeatherAC } from "../../store";
import "./weather.modules.css";
import { Spinner } from "./spinner/spinner.jsx";

class WeatherMain extends React.Component {
  state = {
    city: "people",
    id: '1',
  };

  onChangeCity = ({ target }) => {
    this.setState({ city: `${target.value}` });
  };
  onChangeId = ({ target }) => {
    this.setState({ id: `${target.value}` });
  };

  fetchWeatherDebounced = _debounce(() => {
    console.log(this.state.id);
    this.props.getWeather(this.state.city, this.state.id);
  }, 1000);

  componentDidMount() {
    this.fetchWeatherDebounced();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      this.fetchWeatherDebounced();
    }
  }

  render() {
    const { data, isLoading, isLoaded, isError } = this.props;

    console.log(data);

    return (
      <div className="weather">
        <input
          type=""
          value={this.state.city}
          placeholder="Введите город"
          onChange={this.onChangeCity}
        />
        <input
          type=""
          value={this.state.id}
          placeholder="Введите город"
          onChange={this.onChangeId}
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
                <th>name</th>
                <th>{data.name}</th>
              </tr>
              <tr>
                <td>height</td>
                <td>{data.height}</td>
              </tr>
              <tr>
                <td>mass</td>
                <td>{data.mass}</td>
              </tr>
              <tr>
                <td>hair_color</td>
                <td>{data.hair_color}</td>
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
    getWeather: (city, id) => dispatch(WeatherAC.fetchWeather(city, id)),
  };
};

export const Weather = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherMain);
