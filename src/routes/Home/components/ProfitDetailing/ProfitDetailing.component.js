import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Table } from 'antd'

class ProfitDetailing extends Component {
  static propTypes = {
    changes: PropTypes.array.isRequired,
    period: PropTypes.string.isRequired,
    periods: PropTypes.array.isRequired,
    tickersNames: PropTypes.object.isRequired
  }

  render () {
    const { changes, tickersNames, periods } = this.props
    const period = periods.find(item => item.value === this.props.period)
    const totalInvest = changes.reduce((sum, current) => sum + current.spentUSD, 0)
    const totalProfit = changes.map(item => item.list[item.list.length - 1])
      .reduce((sum, current) => sum + current.y, 0)
    const totalPercent = Math.round(totalProfit / totalInvest * 100)

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Investment',
      dataIndex: 'investments',
      render: (text, record) => text + '$'
    }, {
      title: 'Profit',
      dataIndex: 'profit',
      render: (text, record) =>
        <span>{text}$
          <span className={'vertical-top ' + (record['profitP'] > 0 ? 'increase' : 'decrease')}>
            {record['profitP'] > 0 && '+'}{record['profitP']}%
          </span>
        </span>
    }]
    const table = changes.map(item => {
      const profit = item.list[item.list.length - 1].y
      const profitP = Math.floor(profit / item.spentUSD * 100)
      const investmentsP = Math.floor(item.spentUSD / totalInvest * 100)

      return {
        name: tickersNames[item.ticker],
        investments: item.spentUSD,
        investmentsP,
        profit,
        profitP
      }
    })

    return (
      <div>
        <h6 className='m-top-20'>Detailing</h6>
        <Table columns={columns} dataSource={table} size='middle' pagination={false} rowKey='name' />
        <h6 className='m-top-20'>Conclusion</h6>
        <p className='text-tin'>If you had invested <b>{totalInvest}$</b> in cryptocurrency&nbsp;
          {changes.map((item, i) =>
            <span key={i}>{tickersNames[item.ticker]}{i !== changes.length - 1 && ', '}</span>)}&nbsp;
          {period.name} ago, today your profit would have
          been <b>{totalProfit}$</b>
          {totalPercent > 0
            ? <small className='increase vertical-top'>+{totalPercent}%</small>
            : <small className='decrease vertical-top'>{totalPercent}%</small> }
        </p>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    changes: state.profit.changes,
    tickersNames: state.tickers.names,
    period: state.profit.period,
    periods: state.profit.periods
  }
}
export default connect(mapStateToProps)(ProfitDetailing)
