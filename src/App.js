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

// const Projects = (props) => (
//   <Bundle load={() => Promise.all([
//       import('./Projects'),
//       new Promise(resolve => setTimeout(resolve, 7000))
//     ]).then(([mod]) => mod)
//   }>
//     {(Projects) => {
//       if (Projects) {
//         return <Projects {...props} />
//       }
//       return <Loader {...props} />
//     }}
//   </Bundle>
// )

import Projects from './Projects'

class App extends Component {
  render (props = this.props) {
    const api = props.prismicCtx && props.prismicCtx.api
    return (
      <Router>
        <div className='App'>
          <Route exact path='/' component={Intro} />
          <Route exact path='/loader' component={Loader} />
          <Route exact path='/projects' component={props => api ? <Projects {...props} api={api} /> : <div />} />
        </div>
      </Router>
    )
  }
}

export default App
