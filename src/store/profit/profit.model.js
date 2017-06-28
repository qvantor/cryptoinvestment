import Immutable from 'seamless-immutable'

export default Immutable({
  amount: 1000,
  period: '6mon',
  periods: [
    { value: '1mon', name: '1 month', data: [1, 'month'] },
    { value: '2mon', name: '2 month', data: [2, 'month'] },
    { value: '3mon', name: '3 month', data: [3, 'month'] },
    { value: '4mon', name: '4 month', data: [4, 'month'] },
    { value: '5mon', name: '5 month', data: [5, 'month'] },
    { value: '6mon', name: '6 month', data: [6, 'month'] },
    { value: '1year', name: '1 year', data: [1, 'year'] },
    { value: '2year', name: '2 year', data: [2, 'year'] }],
  currencies: [{ name: 'USDT_BTC', value: 100 }],
  changes: [],
  packages: [
    {
      name: 'Empty',
      currencies: []
    },
    {
      name: 'Pack #1',
      currencies: [
        { name: 'USDT_BTC', value: 49.95 },
        { name: 'BTC_ETH', value: 12.24 },
        { name: 'BTC_XRP', value: 2.56 },
        { name: 'BTC_LTC', value: 7.16 },
        { name: 'BTC_XMR', value: 13.77 },
        { name: 'BTC_DASH', value: 7.91 },
        { name: 'BTC_ZEC', value: 3.85 },
        { name: 'BTC_SC', value: 2.56 }
      ]
    }
  ]
})
