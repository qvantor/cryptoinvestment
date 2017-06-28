import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setPeriod } from 'store/profit/profit.actions'

import { Select } from 'antd'
const Option = Select.Option

class Period extends Component {
  static propTypes = {
    period: PropTypes.string.isRequired,
    periods: PropTypes.array.isRequired,

    setPeriod: PropTypes.func.isRequired
  }

  onSelect = (value) => this.props.setPeriod(value)

  render () {
    const { period, periods } = this.props

    return (
      <div>
        <p className='small-header text-center'>
          Period
        </p>
        <div className='green-select'>
          <Select
            defaultValue={period}
            onSelect={this.onSelect}
            style={{ width: '100%', background: 'transparent' }}>
            {periods.map(item => <Option key={item.value}>{item.name}</Option>)}
          </Select>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    period: state.profit.period,
    periods: state.profit.periods
  }
}
export default connect(mapStateToProps, { setPeriod })(Period)
