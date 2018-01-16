// @flow

import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'

import {
  TEST_DB_FAILURE,
  TEST_DB_REQUEST,
  TEST_DB_SUCCESS,
} from '../action/db'

const initialState = Immutable.fromJS({
  dbTest: 'Initial reducer message',
})

const dbReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case TEST_DB_REQUEST:
      return state.set('dbTest', 'Loading...')
    case TEST_DB_SUCCESS:
      return state.set('dbTest', action.payload)
    case TEST_DB_FAILURE:
      return state.set('dbTest', 'Did not work.')
    default:
      return state
  }
}

export default dbReducer
