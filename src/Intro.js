import React, { Component } from 'react'
import './Intro.css'
import { TweenMax, TimelineMax } from 'gsap'

class Loader extends Component {
  componentDidMount () {
    this.timeline = new TimelineMax({
      paused: true
    })
    this.timeline.to(this.progress, 2.5, {
      'stroke-dashoffset': 80,
      onComplete: () => {
        alert('lol')
      }
    })
  }

  launchProgress = e => {
    this.timeline.timeScale(1)
    this.timeline.play()
  }

  stopProgress = e => {
    this.timeline.timeScale(3)
    this.timeline.reverse()
  }

  render () {
    return (
      <div className='intro-loader'>
        <svg height='170' width='170'>
          <circle cx='85' cy='85' stroke='white' opacity='0.3' r='22.5' strokeWidth='1' fill='transparent' />
          <circle className='donut__svg__circle--one' onMouseOver={this.launchProgress} onMouseLeave={this.stopProgress} ref={progress => { this.progress = progress }} cx='85' cy='85' stroke='white' opacity='1' r='22.5' strokeWidth='1' fill='transparent' />
        </svg>
      </div>
    )
  }
}

class Intro extends Component {
  render (props = this.props) {
    const intro = 'Hey! I\'m a French designer passionate about image and specialized in web design, identity & interaction design'.split(' ')
    return (
      <div className='center-parent'>
        <div className='intro-text__container'>
          <p ref={p => { this.texts = p }} className='intro-text'>{intro.map(word => <span key={word}>{word} </span>)}</p>
        </div>
        <Loader />
      </div>
    )
  }
}

export default Intro
