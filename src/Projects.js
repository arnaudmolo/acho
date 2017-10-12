import React from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import GSComponent from './GSComponent'
import connectToProjects from './redux/projects'

import './Projects.css'
// import Project from './Project'

class SlideInOut extends GSComponent {
  fadeIn () {
    this.timeline
      .fromTo(this.$el, 0.66, {
        yPercent: -100
      }, {
        yPercent: 0
      })
  }
  fadeOut () {
    this.timeline
      .fromTo(this.$el, 0.66, {
        yPercent: 0
      }, {
        yPercent: 100
      })
  }
  componentWillUpdate (nextProps, nextState) {
    this.block = false
  }
  render () {
    return (
      <div className='slide__container'>
        <div className='slide__content' ref={e => { this.$el = e }}>{this.props.children}</div>
      </div>
    )
  }
}

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

class Project extends GSComponent {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.animating
  }
  componentDidMount () {
    console.log('componentDidMount')
  }
  // componentWillAppear (callback) {
  //   console.log('componentWillAppear')
  // }
  // componentDidAppear () {
  //   console.log('componentDidAppear')
  // }
  componentWillEnter (callback) {
    this.onEnter().addCallback(callback)
  }
  // componentDidEnter () {
  //   console.log('componentDidEnter')
  // }
  componentWillLeave (callback) {
    this.onExit().addCallback(callback)
  }
  // componentDidLeave () {
  //   console.log('componentDidLeave')
  // }
  onEnter () {
    this.$title.fadeIn()
    this.$chapo.fadeIn()
    if (this.props.showCover) {
      return this.cover.fadeIn()
    }
    return this.timeline
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

class Projects extends GSComponent {
  constructor (props) {
    super(props)
    this.state = {
      animate: false
    }
  }
  onClick () {
    this.setState({animate: true}, this.props.next)
    setTimeout(() => {
      this.setState({
        animate: false
      })
    }, 800)
  }
  render (props = this.props) {
    let selected = 2
    return (
      <div className='projects' ref={e => { this.$project = e }} onClick={this.onClick.bind(this)}>
        <TransitionGroup key='app'>
          {!this.state.animate && props.projects.map((project, index) =>
            <Project key={Math.random()} data={project.data} showCover={selected === index} animating={this.state.animate} />
          )}
        </TransitionGroup>
      </div>
    )
  }
}

export default connectToProjects(Projects)
