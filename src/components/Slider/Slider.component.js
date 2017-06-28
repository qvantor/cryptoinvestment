import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Slider as AntSlider } from 'antd'

class Slider extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func
  }

  state = { value: 0 }
  timeout = null

  componentWillMount () {
    this.setState({ value: this.props.value })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ value: nextProps.value })
  }

  render () {
    const { onChange } = this.props
    const { value } = this.state

    return (
      <AntSlider
        value={value}
        tipFormatter={val => `${val}%`}
        onChange={value => {
          clearTimeout(this.timeout)
          this.timeout = setTimeout(e => onChange(value), 100)
          this.setState({ value })
        }} />
    )
  }
}

export default Slider
