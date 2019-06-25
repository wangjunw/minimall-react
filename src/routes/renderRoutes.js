import React from 'react';
import { Switch, Route } from 'react-router-dom';
const renderRoutes = routes =>
    routes ? (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    path={route.path}
                    exact={route.exact}
                    key={route.key || index}
                    component={props => <route.component {...props} />}
                />
            ))}
        </Switch>
    ) : (
        ''
    );
export default renderRoutes;
