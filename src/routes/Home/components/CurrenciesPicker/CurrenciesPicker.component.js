import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addCurrency, setCurrencyValue, setCurrencyTicker, removeCurrency } from 'store/profit/profit.actions'

import Slider from 'components/Slider/Slider.component'
import { Select, Icon } from 'antd'
const Option = Select.Option

class CurrenciesPicker extends Component {
  static propTypes = {
    tickers: PropTypes.object.isRequired,
    currencies: PropTypes.array.isRequired,

    addCurrency: PropTypes.func.isRequired,
    setCurrencyTicker: PropTypes.func.isRequired,
    setCurrencyValue: PropTypes.func.isRequired,
    removeCurrency: PropTypes.func.isRequired
  }

  setCurrencyTicker = (currencyName, name) => {
    if (name === '{remove}') {
      this.props.removeCurrency(currencyName)
    } else {
      this.props.setCurrencyTicker(currencyName, { name })
    }
  }

  render () {
    const { tickers, currencies, addCurrency, setCurrencyValue } = this.props
    const filterCurrencies = currencies.map(item => item.name)
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <small>Currency</small>
          </div>
          <div className='col-md-6'>
            <small>Percent</small>
          </div>
        </div>
        <div className='m-top-10'>
          {currencies.map((currency, i) =>
            <div className='row' key={i}>
              <div className='col-md-6'>
                <Select
                  showSearch
                  value={currency.name}
                  onChange={name => this.setCurrencyTicker(currency.name, name)}
                  filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  style={{ width: '100%' }}>
                  <Option key={'{remove}'} className='decrease'>Null</Option>
                  {Object.keys(tickers)
                    .map(ticker =>
                      <Option
                        key={ticker}
                        disabled={filterCurrencies.indexOf(ticker) !== -1}>
                        {tickers[ticker].name}
                      </Option>)}
                </Select>
              </div>
              {currency.name &&
              <div className='col-md-6'>
                <Slider
                  value={currency.value}
                  onChange={value => setCurrencyValue(currency.name, value)} />
              </div>}
            </div>)}
          {currencies.length < 5 &&
          <div className='add-block m-top-10' onClick={addCurrency}>
            <Icon type='plus' />
          </div>}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    tickers: state.tickers.list,
    currencies: state.profit.currencies
  }
}
export default connect(mapStateToProps, {
  addCurrency,
  setCurrencyTicker,
  setCurrencyValue,
  removeCurrency
})(CurrenciesPicker)
