import { getConfig } from 'config'
import { getStore } from '../createStore'
import * as constants from './tickers.constants'
import axios from 'axios'

export function loadTickers () {
  return dispatch => {
    const tickersNames = getStore().getState().tickers.names
    dispatch({ type: constants.TICKERS_LIST_LOAD })

    axios.get(getConfig().url + `public`, { params: { command: 'returnTicker' } })
      .then(({ data }) => {
        const newD = {}
        Object.keys(tickersNames).map(item => {
          if (!data[item]) return null
          newD[item] = data[item]
          newD[item].name = tickersNames[item]
        })
        dispatch({ type: constants.TICKERS_LIST_LOADED, payload: newD })
      })
      .catch(({ err }) => dispatch({ type: constants.TICKERS_LIST_FAIL, payload: err }))
  }
}
