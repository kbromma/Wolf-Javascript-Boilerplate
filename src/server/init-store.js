// @flow

import Immutable from 'immutable'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import helloReducer from '../shared/reducer/hello'
import dbReducer from '../shared/reducer/db'

// Change this to change the initial store

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined

  if (plainPartialState && plainPartialState.hello) {
    // flow-disable-next-line
    preloadedState.hello = helloReducer(undefined, {})
      .merge(Immutable.fromJS(plainPartialState.hello))
  }

  if (plainPartialState && plainPartialState.dbTest) {
    // flow-disable-next-line
    preloadedState.hello = helloReducer(undefined, {})
      .merge(Immutable.fromJS(plainPartialState.dbTest))
  }

  return createStore(combineReducers({ hello: helloReducer, cat: dbReducer }),
    preloadedState, applyMiddleware(thunkMiddleware))
}

export default initStore
