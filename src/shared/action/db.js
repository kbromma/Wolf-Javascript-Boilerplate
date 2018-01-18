// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'

import { dbPageRoute } from '../../shared/routes'

export const TEST_DB_REQUEST = 'TEST_DB_REQUEST'
export const TEST_DB_SUCCESS = 'TEST_DB_SUCCESS'
export const TEST_DB_FAILURE = 'TEST_DB_FAILURE'


export const testDbRequest = createAction(TEST_DB_REQUEST)
export const testDbSuccess = createAction(TEST_DB_SUCCESS)
export const testDbFailure = createAction(TEST_DB_FAILURE)

export const testDbAsync = (cat: any) => (dispatch: Function) => {
  dispatch(testDbRequest())
  return fetch(dbPageRoute(cat), { method: 'GET' })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((data) => {
      if (!data.dbTest) throw Error('No message received')
      dispatch(testDbSuccess(data.dbTest.name))
    })
    .catch(() => {
      dispatch(testDbFailure())
    })
}
