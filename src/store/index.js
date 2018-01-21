import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import filterReducer from './reducers/filter';
import contextReducer  from './reducers/contexts';
import activeContext from './reducers/activeContext';
import passphrase from './reducers/passphrase';


const reducers = combineReducers({
  filter: filterReducer,
  contexts: contextReducer,
  activeContext,
  passphrase,
});

const logger = createLogger({
  duration: true,
});

const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
);

export default store;
