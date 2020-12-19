import React from "react";
import Router from 'components/router/Router'

import "./App.css";

function App() {
  const loading = false
  const authenticated = true

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <Router authenticated={authenticated} />
  );
}

export default App;
