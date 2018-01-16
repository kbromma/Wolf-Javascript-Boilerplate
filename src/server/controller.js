// @flow
/*
* Does the back end work for loading data, sets initial state of a rendered page.
*/
import sqlite from 'sqlite'
import Promise from 'bluebird'

export const homePage = () => null

export const helloPage = () => ({
  hello: { message: 'Server-side preloaded message' },
})

export const helloAsyncPage = () => ({
  hello: { messageAsync: 'Server-side preloaded message for async page' },
})

export const helloEndpoint = (num: number) => ({
  serverMessage: `Hello from the server! (received ${num})`,
})

export const dbPage = () => ({
  dbTest: { dbTest: 'Server-side preloaged message.' },
})

export const dbTestPoint = async (dbPromise: Promise<sqlite.Database>) => {
  const db = await dbPromise
  const category = await db.get('SELECT * FROM Category WHERE id = 1')
  return ({ dbTest: category })
}
