// @flow

// Add different routes and their renderings here to ensure SSR for SEO

import sqlite from 'sqlite'

import {
  homePage,
  helloPage,
  helloAsyncPage,
  helloEndpoint,
  dbTestPoint,
  dbPage,
} from './controller'

import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  DB_PAGE_ROUTE,
  helloEndpointRoute,
  dbPageRoute,
} from '../shared/routes'

import renderApp from './render-app'

export default (app: Object, dbPromise: Promise<sqlite.Database>) => {
  app.get(HOME_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, homePage()))
  })

  app.get(HELLO_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, helloPage()))
  })

  app.get(HELLO_ASYNC_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, helloAsyncPage()))
  })

  app.get(DB_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, dbPage()))
  })

  app.get(dbPageRoute(), (req, res) => {
    dbTestPoint(dbPromise)
    .then((data) => {
      res.json(data)
    })
  })

  app.get(helloEndpointRoute(), (req, res) => {
    res.json(helloEndpoint(req.params.num))
  })

  app.get('/500', () => {
    throw Error('Fake Internal Server Error')
  })

  app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url))
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
  })
}
