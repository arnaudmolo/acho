import React from 'react'
import cx from 'classnames'
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
      <div ref={e => { this.$cover = e }} className='project--cover project--cover__small'>
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
    return (
      <div className={cx({
        'projects-project': true,
        'projects-project__selected': this.props.showCover
      })}>
        <div ref={e => { this.$project = e }} className='project project__small'>
          <div className='project--titraille'>
            <SlideInOut ref={e => { this.$chapo = e }}>
              <p className='project__chapo'>project</p>
            </SlideInOut>
            <SlideInOut ref={e => { this.$title = e }}>
              <h1 className='project--title'>{title}</h1>
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

class FatCover extends React.Component {
  render (props = this.props) {
    return (
      <div ref={e => { this.$cover = e }} className='project--cover project--cover__full'>
        <img alt='cover' className='project--image__full' src={props.src} />
      </div>
    )
  }
}

class FatProject extends React.Component {
  onMove (e) {
    TweenMax.to(
      this.$project,
      0.5,
      {
        x: -e.pageX / 100,
        y: -e.pageY / 100
      }
    )
    TweenMax.to(
      this.$titraille,
      0.5,
      {
        x: -e.pageX / 100,
        y: -e.pageY / 100
      }
    )
  }
  render () {
    const title = this.props.data.title[0].text
    return (
      <div onMouseMove={this.onMove.bind(this)} className='projects-project__full'>
        <div ref={e => { this.$project = e }} className='project project__full'>
          <div ref={e => { this.$titraille = e }} className='project--titraille project--titraille__full'>
            <SlideInOut ref={e => { this.$chapo = e }}>
              <p className='project__chapo'>project</p>
            </SlideInOut>
            <SlideInOut ref={e => { this.$title = e }}>
              <h1 className='project--title project--title__full'>{title}</h1>
            </SlideInOut>
            {this.props.data.services.length > 1
              ? <div>
                <h4>Services</h4>
                <ul>
                  {this.props.data.services.map(({service}) =>
                    <li key={service[0].text}><p>{service[0].text}</p></li>
                  )}
                </ul>
              </div>
            : null}
          </div>
          <FatCover ref={e => { this.cover = e }} src={this.props.data.cover.url} visible={this.props.showCover} />
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
      fullmode: true
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

  hideFat (e) {
    const animations = [
      TweenMax.to(
        this.$fat.$project, 1, {
          width: 605,
          height: 200,
          y: 60
        }
      ),
      TweenMax.to(
        this.$fat.cover.$cover, 1, {
          width: 605,
          height: 200
        }
      )
    ]
    this.timeline.add(animations)
      .to(this.$fat.$project, 0.5, {
        alpha: 0
      }).play()
  }

  showFat () {
    this.timeline.reverse()
  }

  render (props = this.props) {
    return (
      <div className='projects' onClick={this.onClick.bind(this)}>
        <Navigation onMouseOver={this.hideFat.bind(this)} onMouseLeave={this.showFat.bind(this)} />
        {props.projects.length && <FatProject data={this.props.projects[this.selected].data} ref={e => { this.$fat = e }} />}
        {this.props.projects.length && <Background src={this.props.projects[this.selected].data.cover.url} />}
        <div className='project__container'>
          {props.projects.map((project, index) =>
            <Project key={index} data={project.data} id={project.id} showCover={this.selected === index} ref={e => {
              if (this.selected === index) {
                this.$selected = e
              }
            }} />
          )}
        </div>
      </div>
    )
  }
}

export default connectToProjects(Projects)
