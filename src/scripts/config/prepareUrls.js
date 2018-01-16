// @flow

// Base code taken from react-dev-utils. Edited for my uses.

import url from 'url'
import address from 'address'
import chalk from 'chalk'

export default function prepareUrls(protocol: string,
  host: string,
  devPort: any,
  expPort: any) {
  const formatUrl = (hostname, port) =>
    url.format({
      protocol,
      hostname,
      port,
      pathname: '/',
    })
  const prettyPrintUrl = (hostname, port) =>
    url.format({
      protocol,
      hostname,
      port: chalk.bold(port),
      pathname: '/',
    })

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::'

  let prettyHost
  let lanUrlForConfig
  let lanUrlForTerminal
  let lanUrlForTerminalExp

  if (isUnspecifiedHost) {
    prettyHost = 'localhost'
    try {
      // This can only return an IPv4 address
      lanUrlForConfig = address.ip()
      if (lanUrlForConfig) {
        // Check if the address is a private ip
        // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
        if (
          /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
            lanUrlForConfig,
          )
        ) {
          // Address is private, format it for later use
          lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig, devPort)
          lanUrlForTerminalExp = prettyPrintUrl(lanUrlForConfig, expPort)
        } else {
          // Address is not private, so we will discard it
          lanUrlForConfig = undefined
        }
      }
    } catch (_e) {
      // ignored
    }
  } else {
    prettyHost = host
  }
  const localUrlForTerminal = prettyPrintUrl(prettyHost, devPort)
  const localUrlForBrowser = formatUrl(prettyHost, devPort)
  const localUrlForTerminalExp = prettyPrintUrl(prettyHost, expPort)
  const localUrlForBrowserExp = formatUrl(prettyHost, expPort)
  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForTerminal,
    localUrlForBrowser,
    localUrlForBrowserExp,
    localUrlForTerminalExp,
    lanUrlForTerminalExp,
  }
}
