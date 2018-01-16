// @flow

export const HOME_PAGE_ROUTE = '/'
export const HELLO_PAGE_ROUTE = '/hello'
export const HELLO_ASYNC_PAGE_ROUTE = '/hello-async'
export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404'
export const DB_PAGE_ROUTE = '/db-test'

export const dbPageRoute = (cat: ?any) => `/ajax/db/${cat || ':cat'}`
export const helloEndpointRoute = (num: ?number) => `/ajax/hello/${num || ':num'}`
