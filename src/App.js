import React, { Component } from 'react'
import 'reset-css'
import './App.css'

import Intro from './Intro'
// import Loader from './Loader'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Intro />
      </div>
    )
  }
}

export default App
