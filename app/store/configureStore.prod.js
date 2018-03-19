import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export const history = createHistory();
const router = routerMiddleware(history);

export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(router, thunk)
    );
}
