import React from 'react'
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
      animate: false,
      fullmode: true
    }
  }
  offFull () {
    if (this.state.fullmode && !this.project.timeline.isActive()) {
      this.setState({fullmode: false})
    }
  }
  onFull () {
    if (!this.state.fullmode && !this.project.timeline.isActive()) {
      this.setState({fullmode: true})
    }
  }
  onClick () {
    if (!this.project.timeline.isActive()) {
      return this.props.next()
    }
  }
  render (props = this.props) {
    return (
      <div className='projects' onClick={this.onClick.bind(this)}>
        <Navigation
          onMouseOver={this.offFull.bind(this)}
          onMouseLeave={this.onFull.bind(this)} />
        {this.props.projects.length &&
          <Background
            src={this.props.projects[this.selected].data.cover.url} />}
        <div className='project__container' onMouseMove={this.onFull.bind(this)}>
          {props.projects.map((project, index) =>
            <Project ref={ref => {
              if (this.selected === index) {
                this.project = ref
              }
            }}
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
