import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Router from "components/router/Router";
import { auth } from "services/firebase";
import { setIsAuthenticated } from "store/auth";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      dispatch(setIsAuthenticated(!!user));
    });
  }, [dispatch]);

  return <Router />;
}

export default App;
