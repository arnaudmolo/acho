import React from 'react'
import Transition from 'react-transition-group/Transition'
import { TweenMax } from 'gsap'
import GSComponent from './GSComponent'

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
    this.timeline.timeScale(1).play()
  }
  unload () {
    TweenMax.to(
      this.$container, 1, {
        alpha: 0
      }
    )
    this.timeline.timeScale(3).reverse()
  }
  componentDidMount () {
    this.timeline.to(
      this.$progress, 4, {
        width: 235,
        onComplete: this.props.onLoad,
        onUpdate: () => {
          const round = parseInt(this.timeline.progress() * 3, 10)
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
      <Transition in={props.in} timeout={500} mountOnEnter>
        {state =>
          state !== 'exited' && <Loader animationState={state} {...props} />
        }
      </Transition>
    )
  }
}

export default LoaderAnimation
