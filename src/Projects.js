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
      fullmode: true,
      xtra: false
    }
    window.addEventListener('keydown', e => this.onClick())
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
    this.setState({
      xtra: !this.state.xtra
    })
    // if (!this.project.timeline.isActive()) {
    //   return this.props.next()
    // }
  }
  onProjectLoad (project) {
    this.setState({
      xtra: true
    })
    setTimeout(() => this.props.history.push('/project/' + this.props.projects[this.selected].uid), 1000)
  }
  render (props = this.props) {
    return (
      <div className={`projects`} onClick={this.onClick.bind(this)}>
        <Navigation
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
