import React from 'react'
import { TweenMax } from 'gsap'
import GSComponent from './GSComponent'
import './Cover.css'

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
  fadeOut (down = true) {
    return TweenMax.to(this.$cover, 1, {
      alpha: 0,
      height: 0,
      y: (this.props.fullmode ? 500 : 200) * (down ? 1 : -1)
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
      <div ref={e => { this.$cover = e }} className='cover-container'>
        <img alt='cover' className='project--image' src={props.src} />
      </div>
    )
  }
}

export default Cover
