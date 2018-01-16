// @flow

import 'babel-polyfill'

import ReactDOM from 'react-dom'
import $ from 'jquery'
import Tether from 'tether'


import App from '../shared/app'
import { APP_CONTAINER_SELECTOR, JSS_SSR_SELECTOR } from '../../config/config'
import setUpSocket from './init/init-socket'
import store from './init/init-store'
import wrapApp from './init/init-app'

window.jQuery = $
window.Tether = Tether
require('bootstrap')


const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

if (!(rootEl instanceof Element)) {
  throw new Error('invalid type')
}

ReactDOM.render(wrapApp(App, store), rootEl)

// For hot reloading
if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('../shared/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../shared/app').default
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}

// Allows jss from server
const jssServerSide = document.querySelector(JSS_SSR_SELECTOR)
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide)

// Set up the sockets
setUpSocket(store)
