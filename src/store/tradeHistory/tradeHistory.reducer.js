import * as constants from './tradeHistory.constants'
import Model from './tradeHistory.model'

export default function tradeHistory (state = Model, action) {
  switch (action.type) {
    case constants.TRADE_HISTORY_LOADING:
      return state.merge(action.payload, { deep: true })

    case constants.TRADE_HISTORY_LOADED:
      return state.merge(action.payload, { deep: true })
    default:
      return state
  }
}
