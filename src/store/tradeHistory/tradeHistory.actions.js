import { getConfig } from 'config'
import { getStore } from '../createStore'
import * as constants from './tradeHistory.constants'
import axios from 'axios'
import moment from 'moment'

export function loadTicker (ticker) {
  return dispatch => {
    const { tradeHistory } = getStore().getState()
    if (tradeHistory[ticker]) return new Promise(resolve => resolve(tradeHistory[ticker]))

    const start = moment().subtract(2, 'years').format('X')

    const payload = {}
    payload[ticker] = {}
    payload[ticker] = { list: [], loading: true }

    dispatch({ type: constants.TRADE_HISTORY_LOADING, payload })

    return getChartData({
      currencyPair: ticker,
      start,
      end: moment().format('X'),
      period: 86400
    }).then(({ data }) => {
      if (ticker !== 'USDT_BTC') {
        data = data.map(item => {
          const USDBTC = tradeHistory['USDT_BTC'].list.find(btc => btc.date === item.date)
          return { ...item, weightedUSD: USDBTC.weightedAverage * item.weightedAverage }
        })
      }
      payload[ticker] = { list: data, loading: false, loaded: true, start }
      dispatch({ type: constants.TRADE_HISTORY_LOADED, payload })
    })
  }
}

export function loadBitcoinTicker () {
  return dispatch => dispatch(loadTicker('USDT_BTC'))
}

function getChartData (params) {
  params['command'] = 'returnChartData'
  return axios.get(getConfig().url + `public`, { params })
}
