import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import moment from 'moment'
import { dtFormat } from './config'

import * as actions from './actions'
import { ActionCreators } from 'redux-undo'

class App extends Component {

  browserOnline = () => {
    this.props.dispatch(actions.setBrowserOnline(true))
  }

  browserOffline = () => {
    this.props.dispatch(actions.setBrowserOnline(false))
  }

  clearHistory = () => {
    this.props.dispatch(ActionCreators.clearHistory())
  }

  componentDidMount () {
    window.addEventListener('online', this.browserOnline)
    window.addEventListener('offline', this.browserOffline)
  }

  componentWillUnmount () {
    window.removeEventListener('online', this.browserOnline)
    window.removeEventListener('offline', this.browserOffline)
  }

  render () {
    return (
      <div className='container-fluid mt-3 text-center'>
        <Helmet>
          <title>{this.props.online.present.browser ? 'Online' : 'Offline'}</title>  
        </Helmet>
        <h1>
          {this.props.online.present.browser ? 'Online' : 'Offline'}
        </h1>
        <p>
          As of { moment(this.props.online.present.timestamp).fromNow() }
        </p>

        <span>
          <button type='button' className='btn btn-danger' onClick={this.clearHistory}>Clear History</button>
        </span>

        <h3>
          History
        </h3>
        <table className='table table-hover'>
          <thead className='thead-light'>
            <tr>
              <th scope='col'>Entry</th>
              <th scope='col'>State</th>
              <th scope='col'>Time</th>
              <th scope='col'>Exact Time</th>
            </tr>
          </thead>
          <tbody>
            {
              [...this.props.online.past, this.props.online.present].reverse().map((entry, index) => (
                <tr className={ entry.browser ? 'table-success' : 'table-danger'} key={index}>
                  <td>
                    { [...this.props.online.past, this.props.online.present].length - index }
                  </td>
                  <td>
                    <span>
                      {entry.browser ? 'Online' : 'Offline'} {entry.timestamp === this.props.online.present.timestamp ? <span className='badge badge-secondary'>Current</span> : '' }
                    </span>
                  </td>
                  <td>
                    { moment(entry.timestamp).fromNow() }
                  </td>
                  <td>
                    {moment(entry.timestamp).format(dtFormat) }
                  </td>
                
                </tr>)
              )}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { online: state.online }
}

export default connect(mapStateToProps)(App)

// export default App
