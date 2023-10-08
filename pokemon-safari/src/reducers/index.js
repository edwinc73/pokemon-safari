import { combineReducers } from 'redux';
import encounterReducer from './encounterReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  encounter: encounterReducer,
  user: userReducer,
});

export default rootReducer;
