import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Layout } from 'antd'
import './CoreLayout.scss'

const { Header, Footer } = Layout

class CoreLayout extends Component {
  static PropTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    const { children } = this.props
    return (
      <Layout className='core-layout'>
        <Layout>
          <Header>
            <div className='container'>
              <div className='logo'>
                <span>Crypto</span>Investment
                <div className='info'>powered by <b>polonex.com</b></div>
              </div>
            </div>
          </Header>
          <div className='container'>
            {children}
          </div>
          <Footer>
            Qvantor © 2017
            <p className='silver'>It's never too late</p>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default CoreLayout
