// @flow

const config = require('./webpack.config.babel')

const host = process.env.HOST || '0.0.0.0'
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'

//eslint-disable-next-line
module.exports = function () {
  return {
    compress: true,
    clientLogLevel: 'none',
    contentBase: './',
    watchContentBase: true,
    hot: true,
    publicPath: config.default.output.publicPath,
    quiet: true,
    https: protocol === 'https',
    //eslint-disable-next-line
    host: host,
    overlay: false,
  }
}
