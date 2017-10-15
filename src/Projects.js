import React from 'react'
import Transition from 'react-transition-group/Transition'
import { TweenMax } from 'gsap'
import GSComponent from './GSComponent'
import connectToProjects from './redux/projects'
import Navigation from './Navigation'
import Background from './ProjectsBackground'
import Project from './Project'

import './Projects.css'

class Loader extends GSComponent {
  constructor (props) {
    super(props)
    this.state = {
      progress: 0
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.animationState === 'exiting' && prevProps.animationState !== 'exiting') {
      this.unload()
    }
    if (this.props.animationState === 'entering' && prevProps.animationState !== 'entering') {
      this.load()
    }
  }
  load () {
    TweenMax.to(
      this.$container, 1, {
        alpha: 1
      }
    )
    this.timeline.play()
  }
  unload () {
    TweenMax.to(
      this.$container, 1, {
        alpha: 0
      }
    )
    this.timeline.reverse()
  }
  componentDidMount () {
    this.timeline.to(
      this.$progress, 3, {
        width: 235,
        onUpdate: () => {
          const round = parseInt(this.timeline.progress() * 3)
          if (this.state.progress !== round) {
            this.setState({
              progress: round
            })
          }
        }
      }
    ).pause()
    this.load()
  }
  render (props = this.props) {
    return (
      <div ref={e => { this.$container = e }} className='project-loader__container'>
        <div className='project-loader'>
          <div ref={e => { this.$progress = e }} className='project-loader__progress' />
        </div>
        <p>Project open in {3 - this.state.progress}s</p>
      </div>
    )
  }
}

class LoaderAnimation extends GSComponent {
  render (props = this.props) {
    return (
      <Transition in={props.in} timeout={1000} mountOnEnter>
        {state =>
          state !== 'exited' && <Loader animationState={state} />
        }
      </Transition>
    )
  }
}

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
        <LoaderAnimation in={this.state.fullmode} />
      </div>
    )
  }
}

export default connectToProjects(Projects)
