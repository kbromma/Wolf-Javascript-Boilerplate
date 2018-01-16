// @flow

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import Immutable from 'immutable'
import thunkMiddleware from 'redux-thunk'


import { isProd } from '../../shared/util'
// Import reducers
import helloReducer from '../../shared/reducer/hello'
import dbReducer from '../../shared/reducer/db'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const preloadedState = window.__PRELOADED_STATE__
/* eslint-enable no-underscore-dangle */

const store = createStore(combineReducers(
  {
    hello: helloReducer,
    cat: dbReducer,
  }),
  { hello: Immutable.fromJS(preloadedState.hello) },
  composeEnhancers(applyMiddleware(thunkMiddleware)))


export default store

