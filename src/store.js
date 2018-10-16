// @vendors
import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducer from './reducers';

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line

const persistedState = {};

const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(loggerMiddleware)),
);

export default store;
