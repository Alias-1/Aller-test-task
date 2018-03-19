import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserPage from './containers/UserPage';
import EditorPage from './containers/EditorPage';

const Routes = () => (
	<Switch>
        <Route exact path="/fb" component={UserPage} />
        <Route path="/fb/results" component={EditorPage} />
	</Switch>
);

export default Routes;
