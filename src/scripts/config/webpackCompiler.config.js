// @flow

// Majority of this is from react-dev-utils. Edited for my purposes.

import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'
import chalk from 'chalk'
import clearConsole from 'react-dev-utils/clearConsole'


function printInstructions(appName, urls) {
  // eslint-disable-next-line no-console
  console.log(`

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'~~~     ~~~\`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@'                     \`@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@'                           \`@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@'                               \`@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@'                                   \`@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@'     Wolf Bot Development Server     \`@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@'                                       \`@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@                                         @@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@'                                         \`@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@                                           @@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@                                           @@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@                       n,                  @@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@                     _/ | _                @@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@                    /'  \`'/                @@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@a                 <~    .'                a@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@                 .'    |                 @@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@a              _/      |                a@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@a           _/      \`.\`.              a@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@a     ____/ '   \\__ | |______       a@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@a__/___/      /__\\ \\ \\     \\___.a@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@/  (___.'\\_______)\\_|_|        \\@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@|\\________                       ~~~~~\\@@@@@@@@@@@@@@@@@@
~~~\\@@@@@@@@@@@@@@||       |\\___________________________/|@/~~~~~~~~~~~\\@@@
    |~~~~\\@@@@@@@/ |  |    | |          | ||\\____________|@@
    `)

  console.log() // eslint-disable-line no-console
  console.log(`You can now view ${chalk.bold(appName)} in the browser.`) // eslint-disable-line no-console
  console.log() // eslint-disable-line no-console

  if (urls.lanUrlForTerminal) {
    console.log( // eslint-disable-line no-console
      `  ${chalk.bold('Local:')}            ${urls.localUrlForTerminalExp}`,
    )
    console.log( // eslint-disable-line no-console
      `  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminalExp}`,
    )
  } else {
    console.log(`  ${urls.localUrlForTerminalExp}`) // eslint-disable-line no-console
  }
}

function createCompiler(webpack: any, config: any, appName: string, urls: any) {
  // "Compiler" is a low-level interface to Webpack.
  // It lets us listen to some events and provide our own custom messages.
  const compiler = webpack(config)

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('invalid', () => {
    console.log('Compiling...') // eslint-disable-line no-console
  })

  let isFirstCompile = true

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', (stats) => {
    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    const messages = formatWebpackMessages(stats.toJson({}, true))
    const isSuccessful = !messages.errors.length && !messages.warnings.length
    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!')) // eslint-disable-line no-console
    }
    if (isSuccessful && isFirstCompile) {
      clearConsole()
      printInstructions(appName, urls)
    }
    isFirstCompile = false

    // If errors exist, only show errors.
    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1
      }
      console.log(chalk.red('Failed to compile.\n')) // eslint-disable-line no-console
      console.log(messages.errors.join('\n\n')) // eslint-disable-line no-console
      return
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n')) // eslint-disable-line no-console
      console.log(messages.warnings.join('\n\n')) // eslint-disable-line no-console
    }
  })
  return compiler
}

export default createCompiler
