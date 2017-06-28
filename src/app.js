import React, { Component } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider, connect } from 'react-redux'
import PropTypes from 'prop-types'

import { calculateChanges } from 'store/profit/profit.actions'
import { loadBitcoinTicker } from 'store/tradeHistory/tradeHistory.actions'

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,

    loadBitcoinTicker: PropTypes.func.isRequired,
    calculateChanges: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.loadBitcoinTicker().then(this.props.calculateChanges)
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={this.props.routes} />
        </div>
      </Provider>
    )
  }
}

export default connect(null, { loadBitcoinTicker, calculateChanges })(App)
