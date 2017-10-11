import React from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
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
  onEnter () {
    this.$title.fadeIn()
    this.$chapo.fadeIn()
    if (this.props.showCover) {
      this.cover.fadeIn()
    }
  }

  onEnd (that) {
    return function (node, done) {
      console.log('??????????,', this.enter, this.exit, this.in, this.appear)
      if (this.in) {
        // done()
      } else {
        that.$title.fadeOut()
        that.$chapo.fadeOut()
        that.cover.fadeOut().addCallback(done)
      }
    }
  }

  render (props = this.props) {
    const title = props.data.title[0].text
    // console.log(props, props.enter, props.exit, props.in)
    return (
      <Transition {...props} addEndListener={this.onEnd(this)} mountOnEnter onEntered={this.onEnter.bind(this)}>
        {state =>
          <div className='projects-project' id={console.log(state)}>
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
              <Cover ref={e => { this.cover = e }} src={props.data.cover.url} animationState={state} />
            </div>
          </div>
        }
      </Transition>
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
    this.setState({
      animate: true
    }, () => {
      this.props.next()
    })
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.state.animate) {
      this.setState({animate: false})
    }
  }
  render (props = this.props) {
    let selected = 2
    return (
      <div className='projects' ref={e => { this.$project = e }} onClick={this.onClick.bind(this)}>
        <TransitionGroup appear exit enter>
          {
            props.projects.map((project, index) =>
              <Project key={index} data={project.data} showCover={selected === index} />
            )
          }
        </TransitionGroup>
      </div>
    )
  }
}

export default connectToProjects(Projects)
