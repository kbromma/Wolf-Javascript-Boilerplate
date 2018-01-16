// @flow

import { connect } from 'react-redux'

import { testDbAsync } from '../action/db'
import Button from '../component/button'

const mapStateToProps = () => ({
  label: 'Get data from a database asynchronously',
})

const mapDispatchToProps = dispatch => ({
  handleClick: () => { dispatch(testDbAsync(1234)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)
