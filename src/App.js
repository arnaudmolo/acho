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
// import Loader from './Loader'
import Projects from './Projects'
import Cursor from './Cursor'

class App extends Component {
  render (props = this.props) {
    return (
      <div>
        <Cursor />
        <Router>
          <div className='App'>
            <Route exact path='/' component={Intro} />
            <Route path='/project/:uid' component={ProjectPage} />
            <Route exact path='/projects' component={Projects} />
          </div>
        </Router>
      </div>
    )
  }
}

export default Redux(connectToLoader(App))

// class App extends Component {
//   render (props = this.props) {
//     return (
//       <div>
//         <Router>
//           <div className='App'>
//             <Route exact path='/' component={Intro} />
//             {props.loader.loader ? <Loader />
//             : <div>
//               <Route path='/project/:uid' component={ProjectPage} />
//               <Route exact path='/projects' component={Projects} />
//             </div>}
//           </div>
//         </Router>
//       </div>
//     )
//   }
// }
