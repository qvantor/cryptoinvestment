import * as constants from './profit.constants'
import Model from './profit.model'

export default function profit (state = Model, action) {
  switch (action.type) {
    case constants.PROFIT_AMOUNT_SETTED:
      return state.merge({ amount: action.payload })

    case constants.PROFIT_PERIOD_SETTED:
      return state.merge({ period: action.payload })

    case constants.PROFIT_CHANGES_SETTED:
      return state.merge({ changes: action.payload })

    case constants.PROFIT_CURRENCY_ADDED:
      return state.merge({ currencies: state.currencies.concat([{ value: 0 }]) })

    case constants.PROFIT_CURRENCY_SETTED:
      return state.merge({
        currencies: state.currencies.update(state.currencies.findIndex(item => item.name === action.payload.name),
          item => item.merge(action.payload.value))
      })

    case constants.PROFIT_CURRENCY_VALUES_SETTED:
      return state.merge({
        currencies: state.currencies.map(item => {
          return { ...item, value: action.payload.find(newItem => newItem.name === item.name).value }
        })
      })

    case constants.PROFIT_CURRENCY_REMOVED:
      return state.merge({
        currencies: state.currencies.filter(item => item.name !== action.payload)
      })

    case constants.PROFIT_CURRENCY_PACKAGE_SET:
      return state.merge({
        currencies: state.packages.find(item => item.name === action.payload).currencies
      })

    default:
      return state
  }
}
