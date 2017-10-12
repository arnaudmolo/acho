import React from 'react'
// import GSComponent from './GSComponent'
import { TweenMax } from 'gsap'
import './SlideInOut.css'

class SlideInOut extends React.Component {
  componentDidMount () {
    this.fadeIn()
  }
  fadeIn () {
    return TweenMax
      .fromTo(this.$el, 0.66, {
        yPercent: -100,
        alpha: 0
      }, {
        yPercent: 0,
        alpha: 1
      })
  }
  fadeOut () {
    return TweenMax
      .fromTo(this.$el, 0.66, {
        yPercent: 0,
        alpha: 1
      }, {
        yPercent: 100,
        alpha: 0
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

export default SlideInOut
