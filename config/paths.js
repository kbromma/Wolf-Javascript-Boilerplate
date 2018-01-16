// @flow

const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => (path.resolve(appDirectory, relativePath): string)

module.exports = {
  dotenv: resolveApp('.env'),
  appPublic: resolveApp('public'),
  appServerJs: resolveApp('src/server/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  distSrc: resolveApp('dist'),
  clientSrc: resolveApp('src/client'),
}
