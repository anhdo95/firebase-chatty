import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "pages/Home";
import Chat from "pages/Chat";
import Signup from "pages/Signup";
import Login from "pages/Login";
// import { auth } from "services/firebase";

export function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Redirect to="/chat" /> : <Component {...props} />
      }
    />
  );
}

const routes = [
  { path: "/", component: Home, exact: true },
  { path: "/chat", component: Chat, private: true },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
];

export default routes;
