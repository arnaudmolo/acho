import React from 'react'
import { TweenMax } from 'gsap'
import GSComponent from './GSComponent'
import './Cover.css'

class Cover extends GSComponent {
  componentDidMount () {
    if (this.props.visible && this.props.mountOnEnter) {
      this.fadeIn()
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.visible) {
      const srcChanged = this.props.src !== prevProps.src
      const fullmodeChanged = this.props.fullmode !== prevProps.fullmode
      if (!prevProps.visible || srcChanged || fullmodeChanged) {
        this.fadeIn()
      }
    }
  }
  fadeOut (down = true) {
    return TweenMax.to(this.$cover, 1, {
      alpha: 0
    })
  }
  fadeIn () {
    return TweenMax.fromTo(this.$cover, 1, {
      y: 0
    }, {
      alpha: 1
    })
  }
  render (props = this.props) {
    return (
      <div ref={e => { this.$cover = e }} className='cover-container'>
        <img alt='cover' className='project--image' src={props.src} />
      </div>
    )
  }
}

export default Cover
