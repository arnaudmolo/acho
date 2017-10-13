import React from 'react'
import cx from 'classnames'
import GSComponent from './GSComponent'
import connectToProjects from './redux/projects'
import SlideInOut from './SlideInOut'
import { TweenMax } from 'gsap'
import Navigation from './Navigation'
import Background from './ProjectsBackground'

import './Projects.css'

class Cover extends GSComponent {
  componentDidMount () {
    if (this.props.visible) {
      this.fadeIn()
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.visible) {
      this.fadeIn()
    }
  }
  fadeOut () {
    return TweenMax.to(this.$cover, 1, {
      alpha: 0,
      height: 0,
      y: this.props.fullmode ? 500 : 200
    })
  }
  fadeIn () {
    return TweenMax.fromTo(this.$cover, 1, {
      y: 0
    }, {
      alpha: 1, height: this.props.fullmode ? 500 : 200
    })
  }
  render (props = this.props) {
    return (
      <div ref={e => { this.$cover = e }} className='project--cover'>
        <img alt='cover' className='project--image' src={props.src} />
      </div>
    )
  }
}

class Project extends GSComponent {
  constructor (props) {
    super(props)
    this.state = props
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this.onExit().addCallback(() => {
        this.setState(this.props)
      })
    }
    if (this.state.id !== prevState.id) {
      this.onEnter()
    }
  }
  onEnter () {
    const animations = [
      this.$title.fadeIn(),
      this.$chapo.fadeIn()
    ]
    if (this.state.showCover) {
      animations.push(this.cover.fadeIn())
    }
    return this.timeline.add(animations)
  }
  onExit () {
    return this.timeline.add([
      this.$title.fadeOut(),
      this.$chapo.fadeOut(),
      this.cover.fadeOut()
    ])
  }
  render (props = this.props) {
    const title = this.state.data.title[0].text
    let textVisible = true
    if (props.fullmode) {
      textVisible = props.showCover
    }
    return (
      <div className='projects-project'>
        <div ref={e => { this.$project = e }} className={cx({
          project: true,
          project__small: !props.fullmode,
          project__full: props.fullmode && props.showCover
        })}>
          <div className='project--titraille'>
            <SlideInOut ref={e => { this.$chapo = e }} visible={textVisible}>
              <p className='project__chapo'>project</p>
            </SlideInOut>
            <SlideInOut ref={e => { this.$title = e }} visible={textVisible}>
              <h1 className='project--title'>{title}</h1>
            </SlideInOut>
          </div>
          <Cover
            ref={e => { this.cover = e }}
            src={this.state.data.cover.url}
            visible={this.props.showCover}
            fullmode={props.fullmode} />
        </div>
      </div>
    )
  }
}

class Projects extends GSComponent {
  constructor (props) {
    super(props)
    this.selected = 2
    this.state = {
      animate: false,
      fullmode: false
    }
  }
  offFull () {
    this.setState({fullmode: false})
  }
  onFull () {
    this.setState({fullmode: true})
  }
  onClick () {
    if (this.state.animate) {
      return
    }
    this.setState({animate: true}, this.props.next)
    setTimeout(() => {
      this.setState({
        animate: false
      })
    }, 1100)
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
        <div className='project__container'>
          {props.projects.map((project, index) =>
            <Project
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
