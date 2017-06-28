import { getStore } from '../createStore'
import { loadTicker } from '../tradeHistory/tradeHistory.actions'
import * as constants from './profit.constants'
import moment from 'moment'

export function setPackage (name) {
  return dispatch => {
    dispatch({ type: constants.PROFIT_CURRENCY_PACKAGE_SET, payload: name })
    const currencies = getStore().getState().profit.currencies
      .filter(item => item.name !== 'USDT_BTC')
    const Promises = currencies.map(item => dispatch(loadTicker(item.name)))

    Promise.all(Promises).then(data => dispatch(calculateChanges()))
  }
}

export function setAmount (value) {
  return dispatch => {
    dispatch({ type: constants.PROFIT_AMOUNT_SETTED, payload: value })
    dispatch(calculateChanges())
  }
}

export function setPeriod (value) {
  return dispatch => {
    dispatch({ type: constants.PROFIT_PERIOD_SETTED, payload: value })
    dispatch(calculateChanges())
  }
}

export function addCurrency () {
  return dispatch => dispatch({ type: constants.PROFIT_CURRENCY_ADDED })
}

export function setCurrencyValue (name, value) {
  return dispatch => {
    const currencyValues = []
    currencyValues.push({ name, value })

    const currencies = getStore().getState().profit.currencies
    const currenciesWithoutChanged = currencies.filter(item => item.name !== name)
    const rest = 100 - value
    const sum = currenciesWithoutChanged.reduce((sum, current) => sum + current.value, 0)
    let newValue = sum === 0 ? rest / currenciesWithoutChanged.length : null

    currenciesWithoutChanged
      .map(item => {
        const propValue = rest === 0 ? 0 : item.value * (rest / sum)
        currencyValues.push({ name: item.name, value: newValue || propValue })
      })

    dispatch({ type: constants.PROFIT_CURRENCY_VALUES_SETTED, payload: currencyValues })

    dispatch(calculateChanges())
  }
}

export function setCurrencyTicker (name, value) {
  return dispatch => {
    dispatch(setCurrency(name, value))
    dispatch(loadTicker(value.name)).then(data => dispatch(calculateChanges()))
  }
}

export function setCurrency (name, value) {
  return dispatch => dispatch({ type: constants.PROFIT_CURRENCY_SETTED, payload: { name, value } })
}

export function removeCurrency (name) {
  return dispatch => {
    dispatch({ type: constants.PROFIT_CURRENCY_REMOVED, payload: name })
    dispatch(calculateChanges())
  }
}

export function calculateChanges () {
  return dispatch => {
    const { profit: { currencies, amount, period, periods }, tradeHistory } = getStore().getState()
    const payload = []
    const periodData = periods.find(item => item.value === period).data
    currencies.map(item => {
      const BTC = item.name === 'USDT_BTC' ? 'weightedAverage' : 'weightedUSD'
      if (item.value < 1
        || !tradeHistory[item.name].list
        || !tradeHistory[item.name].list[0]) return

      const list = tradeHistory[item.name].list
        .filter(item => item.date > moment().subtract(periodData[0], periodData[1]).format('X'))
      const usd = Math.floor((item.value / 100) * amount)
      let buyCrypto = usd / list[0][BTC]

      payload.push({
        buyed: buyCrypto,
        spentUSD: usd,
        ticker: item.name,
        list: list.map(item => {
          const change = Math.floor(buyCrypto * item[BTC]) - usd
          return { x: item.date * 1000, y: change, percent: Math.floor((change / usd) * 100) }
        })
      })
    })

    dispatch({ type: constants.PROFIT_CHANGES_SETTED, payload: payload })
  }
}
