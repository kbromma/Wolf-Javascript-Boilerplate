// @flow

import compression from 'compression'
import express from 'express'
import { Server } from 'http'
import socketIO from 'socket.io'
import sqlite from 'sqlite'
import Promise from 'bluebird'

import routing from './routing'
import { WEB_PORT, STATIC_PATH } from '../../config/config'
import setUpSocket from './socket'

const app = express()

// flow-disable-next-line
const http = Server(app)
const io = socketIO(http)
setUpSocket(io)

const dbPromise = Promise.resolve()
  .then(() => sqlite.open('./db.sqlite', { Promise }))
  .then(db => db.migrate({ force: 'last' }))

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

routing(app, dbPromise)

http.listen(WEB_PORT, () => {
  console.log('Restarting server...') // eslint-disable-line no-console
})
