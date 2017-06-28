import React, { Component } from 'react'

import ProfitCalcPicker from '../components/ProfitCalcPicker/ProfitCalcPicker.component'
import ProfitChart from '../components/ProfitChart/ProfitChart.component'
import ProfitDetailing from '../components/ProfitDetailing/ProfitDetailing.component'

class HomeLayout extends Component {
  render () {
    return (
      <div className='row'>
        <div className='col-md-3'>
          <ProfitCalcPicker />
        </div>
        <div className='col-md-9'>
          <div className='block white'>
            <ProfitChart />
            <ProfitDetailing />
          </div>
        </div>
      </div>
    )
  }
}

export default HomeLayout
