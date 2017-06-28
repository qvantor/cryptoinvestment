import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setAmount } from 'store/profit/profit.actions'

class AmountOfInvestments extends Component {
  static propTypes = {
    amount: PropTypes.number.isRequired,

    setAmount: PropTypes.func.isRequired
  }

  onChange = ({ target:{ value } }) => {
    const number = Number(value)
    if (Number.isFinite(number)) {
      if (number < 9) {
        this.props.setAmount(10)
      } else {
        this.props.setAmount(number)
      }
    }
  }

  render () {
    const { amount } = this.props
    return (
      <div>
        <p className='small-header text-center'>
          Amount of Investment
        </p>
        <div className='big-green-input'>
          <span>$</span>
          <input type='text' value={amount} onChange={this.onChange} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    amount: state.profit.amount
  }
}
export default connect(mapStateToProps, { setAmount })(AmountOfInvestments)
