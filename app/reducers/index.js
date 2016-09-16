import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import grid from './grid';

const rootReducer = combineReducers({
  grid,
  routing
});

export default rootReducer;
