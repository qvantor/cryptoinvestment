import * as constants from './tickers.constants'
import Model from './tickers.model'

export default function tickers (state = Model, action) {
  switch (action.type) {
    case constants.TICKERS_LIST_LOAD:
      return state.merge({ listLoading: true })

    case constants.TICKERS_LIST_LOADED:
      return state.merge({ listLoading: false, list: action.payload })

    case constants.TICKERS_LIST_FAIL:
      return state.merge({ listLoading: false })

    default:
      return state
  }
}
