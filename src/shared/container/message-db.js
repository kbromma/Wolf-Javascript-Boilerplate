// @flow

import { connect } from 'react-redux'

import MessageDB from '../component/message'

const mapStateToProps = state => ({
  message: state.cat.get('dbTest'),
})

export default connect(mapStateToProps)(MessageDB)
