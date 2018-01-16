// @flow

import React from 'react'
import Helmet from 'react-helmet'

import Message from '../../container/message-db'
import DbButton from '../../container/db-button'


const title = 'DB Test'

const DbPage = () =>
  <div className="container mt-4">
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'A page to test sqlite database.' },
        { property: 'og:title', content: title },
      ]}
    />
    <div className="row">
      <div className="col-12">
        <h1>{title}</h1>
        <Message />
        <DbButton />
      </div>
    </div>
  </div>

export default DbPage
