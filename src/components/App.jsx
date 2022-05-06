import React from "react";
import Weather from "./weather"
import { Provider } from "react-redux";
import { store } from "../store";

import './App.css';


function App() {
  return (
    <div className="App">
      <Provider store = {store}>
      <Weather />
      </Provider>
    </div>
  );
}

export default App;
