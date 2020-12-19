import React, { useCallback } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import routes, { PrivateRoute, PublicRoute } from "routes";

function Router(props) {
  const renderRoutes = useCallback(
    function () {
      return routes.map((route) => {
        const routeProps = {
          exact: route.exact,
          key: route.path,
          path: route.path,
          component: route.component,
        };

        if (route.path === "/") {
          return <Route {...routeProps} />;
        }

        const Component = route.private ? PrivateRoute : PublicRoute;
        return (
          <Component {...routeProps} authenticated={props.authenticated} />
        );
      });
    },
    [props.authenticated]
  );

  return (
    <BrowserRouter>
      <Switch>{renderRoutes()}</Switch>
    </BrowserRouter>
  );
}

export default Router;
