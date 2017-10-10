import React, { Component } from 'react'
import Redux from './redux'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import 'reset-css'
import './App.css'

import Intro from './Intro'
import Loader from './Loader'
import Projects from './Projects'

class App extends Component {
  render (props = this.props) {
    return (
      <Router>
        <div className='App'>
          <Route exact path='/' component={Intro} />
          <Route exact path='/loader' component={Loader} />
          <Route exact path='/projects' component={Projects} />
        </div>
      </Router>
    )
  }
}

export default Redux(App)
