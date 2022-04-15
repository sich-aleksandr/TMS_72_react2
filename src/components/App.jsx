import React from "react";
import Weather from "./weather"
import Authorization from "./authorization"
import { ErrorBoundary } from './common/ErrorBoundary'

import './App.css';


function App() {
  return (
    <div className="App">
      <ErrorBoundary>
      <Authorization />
      <Weather />
      </ErrorBoundary>
    </div>
  );
}

export default App;
