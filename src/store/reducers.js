import { combineReducers } from 'redux'
import locationReducer from './location'
import tickers from './tickers/tickers.reducer'
import profit from './profit/profit.reducer'
import tradeHistory from './tradeHistory/tradeHistory.reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    tickers,
    profit,
    tradeHistory,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
