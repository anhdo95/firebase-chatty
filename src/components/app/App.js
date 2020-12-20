import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";

import { auth } from "services/firebase";
import { setIsAuthenticated } from "store/auth";

import Routes from "components/routes/Routes";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      dispatch(setIsAuthenticated(!!user));
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <main class="main">
        <Switch>
          <Routes />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
