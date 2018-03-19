import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import paragraphs from './reducer_paragraphs';

const rootReducer = combineReducers({
    form: formReducer,
    paragraphs,
    routing
});

export default rootReducer;
