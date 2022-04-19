import React from "react";
import Weather from "./weather"
import Authorization from "./authorization"
// import { ErrorBoundary } from './common/ErrorBoundary'
import { Provider } from "react-redux";
import { store } from "../store";

import './App.css';


function App() {
  return (
    <div className="App">
      <Provider store = {store}>
      <Authorization />
      <Weather />
      </Provider>
    </div>
  );
}

export default App;
