import React from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import GSComponent from './GSComponent'
import connectToProjects from './redux/projects'
import SlideInOut from './SlideInOut'
import { TweenMax } from 'gsap'
import Navigation from './Navigation'

import './Projects.css'

class Cover extends GSComponent {
  componentDidMount () {
    if (this.props.visible) {
      this.fadeIn()
    }
  }
  fadeOut () {
    return TweenMax.to(this.$cover, 1, {
      alpha: 0,
      height: 0,
      y: 200
    })
  }
  fadeIn () {
    return TweenMax.fromTo(this.$cover, 1, {y: 0}, {
      alpha: 1,
      height: 200
    })
  }
  render (props = this.props) {
    return (
      <div ref={e => { this.$cover = e }} className='project__cover'>
        <img alt='cover' className='project__image' src={props.src} />
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
    return (
      <div className='projects-project'>
        <div ref={e => { this.$project = e }} className='project'>
          <div className='project__titraille'>
            <SlideInOut ref={e => { this.$chapo = e }}>
              <p className='project__chapo'>project</p>
            </SlideInOut>
            <SlideInOut ref={e => { this.$title = e }}>
              <h1 className='project__title'>{title}</h1>
            </SlideInOut>
            {this.state.data.services.length > 1
              ? <div>
                <h4>Services</h4>
                <ul>
                  {this.state.data.services.map(({service}) =>
                    <li key={service[0].text}><p>{service[0].text}</p></li>
                  )}
                </ul>
              </div>
            : null}
          </div>
          <Cover ref={e => { this.cover = e }} src={this.state.data.cover.url} visible={this.props.showCover} />
        </div>
      </div>
    )
  }
}

class Background extends GSComponent {
  constructor (props) {
    super(props)
    this.state = {
      background: props.src
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.src !== prevProps.src) {
      this.hide(this.props)
    }
    if (this.state.background !== prevState.background) {
      this.show(this.props)
    }
  }
  hide (props) {
    this.timeline.to(this.$background, 1, {
      alpha: 0,
      onComplete: () =>
        this.setState({
          background: props.src
        })
    })
  }
  show (props) {
    this.timeline.to(this.$background, 1, {
      alpha: 0.3
    })
  }
  render () {
    return <div ref={e => { this.$background = e }} className='project__background-container' style={{backgroundImage: `url(${this.state.background})`}} />
  }
}

class Projects extends GSComponent {
  constructor (props) {
    super(props)
    this.selected = 2
    this.state = {
      animate: false
    }
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
        <Navigation />
        {this.props.projects.length && <Background src={this.props.projects[this.selected].data.cover.url} />}
        <TransitionGroup key='app'>
          {props.projects.map((project, index) =>
            <Project key={index} data={project.data} id={project.id} showCover={this.selected === index} />
          )}
        </TransitionGroup>
      </div>
    )
  }
}

export default connectToProjects(Projects)
