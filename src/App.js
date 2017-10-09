import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import 'reset-css'
import './App.css'

import Intro from './Intro'
import Bundle from './Bundle'
import Loader from './Loader'

const Projects = (props) => (
  <Bundle load={() => Promise.all([
      import('./Projects'),
      new Promise(resolve => setTimeout(resolve, 1000))
    ]).then(([mod]) => mod)
  }>
    {(Projects) => {
      console.log(Projects)
      if (Projects) {
        return <Projects {...props} />
      }
      return <Loader {...props} />
    }}
  </Bundle>
)

class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <Route exact path='/' component={Intro} />
          <Route exact path='/projects' component={Loader} />
        </div>
      </Router>
    )
  }
}

export default App
