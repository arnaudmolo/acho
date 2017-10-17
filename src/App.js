import React, { Component } from 'react'
import Redux from './redux'
import connectToLoader from './redux/loader'
import ProjectPage from './ProjectPage'

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
          {props.loader.loader ? <Loader {...props} />
          : <div>
            <Route path='/project/:uid' component={ProjectPage} />
            <Route exact path='/projects' component={Projects} />
          </div>
          }
        </div>
      </Router>
    )
  }
}

export default Redux(connectToLoader(App))
