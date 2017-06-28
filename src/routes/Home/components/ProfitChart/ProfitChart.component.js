import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { Radio, Icon } from 'antd'
import ReactHighcharts from 'react-highcharts'

class ProfitChart extends Component {
  static propTypes = {
    changes: PropTypes.array.isRequired,
    tickersNames: PropTypes.object.isRequired
  }
  state = { type: 'area' }

  chart = null

  render () {
    const { changes, tickersNames } = this.props
    const { type } = this.state

    const config = {
      chart: {
        height: window.innerHeight * 0.4
      },
      title: {
        text: null
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: null
        }
      },
      credits: {
        enabled: false
      },
      tooltip: {
        shared: true,
        crosshairs: true,
        formatter: function (e) {
          const date = moment(this.points[0].x).format('MMMM Do YYYY')
          let totalRevenue = { usd: 0, percent: 0 }
          const points = this.points.map(point => {
            const percent = point.point.percent > 0
              ? `<small class='increase'>+${point.point.percent}%</small>`
              : `<small class='decrease'>${point.point.percent}%</small>`

            totalRevenue.usd += point.y

            return `<br/><span style='color:${point.color}'>\u25CF</span>` +
              `${point.series.name}: <b>${point.y}</b> USD ${percent}`
          })
          totalRevenue = `<br/><br/> <b>Total Revenue:</b> ${totalRevenue.usd} USD`

          return date + points.join('') + totalRevenue
        },
        useHTML: true
      },
      plotOptions: {
        series: {
          animation: false,
          stacking: type === 'area' ? 'normal' : null,
          marker: {
            enabled: false
          }
        }
      },
      series: []
    }

    changes.forEach(item => {
      config.series.push({ data: item.list, name: tickersNames[item.ticker], type })
    })

    return (
      <div>
        <h6 className='m-bottom-20'>Profit chart</h6>
        <div className='absolite-right'>
          <Radio.Group
            onChange={e => this.setState({ type: e.target.value })} value={type}>
            <Radio.Button value='area'><Icon type='area-chart' /> Area</Radio.Button>
            <Radio.Button value='line'><Icon type='line-chart' /> Line</Radio.Button>
          </Radio.Group>
        </div>
        <ReactHighcharts
          config={config}
          callback={chart => {
            this.chart = chart
          }} />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    changes: state.profit.changes,
    tickersNames: state.tickers.names
  }
}
export default connect(mapStateToProps)(ProfitChart)
