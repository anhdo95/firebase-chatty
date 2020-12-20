import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import routes, { PrivateRoute, PublicRoute } from "routes";
import { selectIsAuthenticated } from "store/auth";

function Router() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

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
        return <Component {...routeProps} authenticated={isAuthenticated} />;
      });
    },
    [isAuthenticated]
  );

  return renderRoutes();
}

export default Router;
