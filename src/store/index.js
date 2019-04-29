import { applyMiddleware, createStore, combineReducers } from 'redux';
// import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import filterReducer from './reducers/filter';
import contextReducer from './reducers/contexts';
import activeContext from './reducers/active-context';
import passphrase from './reducers/passphrase';
import submitting from './reducers/submitting';

const reducers = combineReducers({
  filter: filterReducer,
  contexts: contextReducer,
  activeContext,
  passphrase,
  submitting,
});

// const logger = createLogger({
//   duration: true,
// });

// const store = createStore(reducers, applyMiddleware(thunk, logger));
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
