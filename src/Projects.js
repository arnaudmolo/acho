import React from 'react'
import WheelIndicator from 'wheel-indicator'
import GSComponent from './GSComponent'
import connectToProjects from './redux/projects'
import Navigation from './Navigation'
import Background from './ProjectsBackground'
import Project from './Project'

import './Projects.css'

class Projects extends GSComponent {
  constructor (props) {
    super(props)
    this.selected = 2
    this.state = {
      fullmode: true,
      xtra: false
    }
  }
  componentDidMount () {
    this.indicator = new WheelIndicator({
      elem: this.$container,
      callback: e => {
        if (this.state.fullmode && !this.project.timeline.isActive()) {
          switch (e.direction) {
            case 'up':
              return this.props.prev()
            case 'down':
              return this.props.next()
          }
        }
      }
    })
  }
  componentWillUnmount () {
    this.indicator.destroy()
  }
  offFull () {
    if (this.state.fullmode) {
      this.setState({fullmode: false})
    }
  }
  onFull () {
    if (!this.state.fullmode) {
      this.setState({fullmode: true})
    }
  }
  onClick () {
    this.setState({
      xtra: !this.state.xtra
    })
  }
  onProjectLoad (project) {
    this.setState({
      xtra: true
    })
    setTimeout(() => this.props.history.push('/project/' + this.props.projects[this.selected].uid), 1000)
  }
  render (props = this.props) {
    return (
      <div className={`projects`} ref={e => { this.$container = e }} onClick={this.onClick.bind(this)}>
        <Navigation
          circles={!this.state.xtra}
          fullmode={this.state.fullmode && !this.state.xtra}
          onMouseOver={this.offFull.bind(this)}
          onMouseLeave={this.onFull.bind(this)} />
        {this.props.projects.length &&
          <Background in={!this.state.xtra}
            src={this.props.projects[this.selected].data.cover.url} />}
        <div className='project__container' onMouseMove={this.onFull.bind(this)}>
          {props.projects.map((project, index) =>
            <Project ref={ref => {
              if (this.selected === index) {
                this.project = ref
              }
            }}
              xtra={this.state.xtra && this.selected === index}
              loader={this.state.fullmode && this.selected === index}
              mountOnEnter
              onLoad={this.onProjectLoad.bind(this)}
              fullmode={this.state.fullmode}
              key={index} data={project.data}
              id={project.id}
              showCover={this.selected === index} />
          )}
        </div>
      </div>
    )
  }
}

export default connectToProjects(Projects)
