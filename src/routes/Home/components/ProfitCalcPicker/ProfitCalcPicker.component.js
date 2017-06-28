import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadTickers } from 'store/tickers/tickers.actions'

import AmountOfInvestments from '../AmountOfInvestments/AmountOfInvestments.component'
import CurrenciesPicker from '../CurrenciesPicker/CurrenciesPicker.component'
import Packages from '../Packages/Packages.component'
import Period from '../Period/Period.component'
import { Spin } from 'antd'

class ProfitCalcPicker extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,

    loadTickers: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.loadTickers()
  }

  render () {
    const { loading } = this.props

    return (
      <Spin spinning={loading}>
        <div className='block darkest top-padding'>
          <AmountOfInvestments />
          <div className='m-top-20'>
            <Period />
          </div>
        </div>
        <div className='block white'>
          <CurrenciesPicker />
          <div className='m-top-20'>
            <Packages />
          </div>
        </div>
      </Spin>
    )
  }
}
const mapStateToProps = state => {
  return {
    loading: state.tickers.listLoading
  }
}
export default connect(mapStateToProps, { loadTickers })(ProfitCalcPicker)
