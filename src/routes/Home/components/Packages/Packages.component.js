import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setPackage } from 'store/profit/profit.actions'

import { Radio } from 'antd'

class Packages extends Component {
  static propTypes = {
    packages: PropTypes.array.isRequired,

    setPackage: PropTypes.func.isRequired
  }

  render () {
    const { packages, setPackage } = this.props

    return (
      <div>
        <h6>Packages</h6>
        <Radio.Group onChange={({ target: { value } }) => setPackage(value)}>
          {packages.map((pack, i) =>
            <Radio.Button value={pack.name} key={i}>{pack.name}</Radio.Button>
          )}
        </Radio.Group>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    packages: state.profit.packages
  }
}
export default connect(mapStateToProps, { setPackage })(Packages)
