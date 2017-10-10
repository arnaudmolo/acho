import React from 'react'
import GSComponent from './GSComponent'
// import { TimelineMax } from 'gsap'
import './Loader.css'

import CustomEase from 'gsap/CustomEase'

class Loader extends GSComponent {
  componentDidMount () {
    this.timeline.to(this.container, 1, {
      css: {
        x: 0
      },
      delay: 1,
      ease: window.Power2.easeOut
    })
    .to(this.bar, 4, {
      css: {
        x: 276
      },
      ease: CustomEase.create('custom', 'M0,0,C0.126,0.382,0.062,0.49,0.22,0.638,0.269,0.684,0.356,0.679,0.42,0.726,0.482,0.772,0.427,0.875,0.494,0.922,0.535,0.95,0.617,0.922,0.668,0.952,0.767,1.01,0.941,1,1,1')
    })
    .to(this.bar, 0, {alpha: 0})
    .to(this.container, 1, {
      css: {
        width: 605,
        height: 280
      },
      ease: window.Power2.easeOut
    })
    .to(this.laodingText, 0.66, {alpha: 0, y: -25}, '-=0.5')
    .to(this.loadedText, 2, {alpha: 1, y: 0}, '-=0.7')
  }

  render (props = this.props) {
    return (
      <div className='center-parent'>
        <div className='loader-text__container'>
          <div ref={e => { this.container = e }} className='loader__animation-container'>
            <p ref={e => { this.laodingText = e }} className='loader-text'>Loading projects in progress...</p>
            <p ref={e => { this.loadedText = e }} className='loader-text loader-text__loaded'>achaufaille</p>
            <div ref={p => { this.bar = p }} className='loader-bar' />
          </div>
        </div>
      </div>
    )
  }
}

export default Loader
