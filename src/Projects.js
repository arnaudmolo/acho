import React from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import GSComponent from './GSComponent'
import connectToProjects from './redux/projects'
import SlideInOut from './SlideInOut'

import './Projects.css'
// import Project from './Project'

class Cover extends GSComponent {
  fadeOut () {
    return this.timeline.to(this.$cover, 1, {
      alpha: 0,
      height: 0,
      y: 200
    })
  }
  fadeIn () {
    return this.timeline.to(this.$cover, 1.5, {
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

class Project extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.animating
  }
  componentWillEnter (callback) {
    this.onEnter().addCallback(callback)
  }
  componentWillLeave (callback) {
    this.onExit().addCallback(callback)
  }
  onEnter () {
    const timeline = this.$title.fadeIn()
    this.$chapo.fadeIn()
    if (this.props.showCover) {
      return this.cover.fadeIn()
    }
    return timeline
  }
  onExit () {
    this.$title.fadeOut()
    this.$chapo.fadeOut()
    return this.cover.fadeOut()
  }
  render (props = this.props) {
    const title = props.data.title[0].text
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
            {props.data.services.length > 1
              ? <div>
                <h4>Services</h4>
                <ul>
                  {props.data.services.map(({service}) =>
                    <li key={service[0].text}><p>{service[0].text}</p></li>
                  )}
                </ul>
              </div>
            : null}
          </div>
          <Cover ref={e => { this.cover = e }} src={props.data.cover.url} />
        </div>
      </div>
    )
  }
}

class Background extends GSComponent {
  constructor (props) {
    super(props)
    console.log(props)
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
      <div className='projects' ref={e => { this.$project = e }} onClick={this.onClick.bind(this)}>
        {this.props.projects.length && <Background src={this.props.projects[this.selected].data.cover.url} />}
        <TransitionGroup key='app'>
          {!this.state.animate && props.projects.map((project, index) =>
            <Project key={Math.random()} data={project.data} showCover={this.selected === index} animating={this.state.animate} />
          )}
        </TransitionGroup>
      </div>
    )
  }
}

export default connectToProjects(Projects)
