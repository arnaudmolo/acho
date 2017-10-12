import React, { Component } from 'react'
import './Intro.css'
import { scaleLinear } from 'd3'
import GSComponent from './GSComponent'

const scale = scaleLinear().range([-90 + 22.5, 90 - 22.5]).domain([0, 180])

class Loader extends GSComponent {
  launchProgress = e => {
    return this.timeline.timeScale(1)
      .to(this.progress, 2.5, {
        'stroke-dashoffset': 80,
        onComplete: () => {
          console.log('..')
          this.props.onLoad()
        }
      }).play()
  }

  skew = e => this.timeline.to(
    this.group, 1, {
      x: scale(e.pageX - this.rect.x),
      y: scale(e.pageY - this.rect.y)
    }, 0
  ).play()

  stopProgress = e => this.timeline.timeScale(3).reverse()

  render () {
    return (
      <div className='intro-loader'>
        <svg height='180' width='180'>
          <g className='intro-loader__container'
            onMouseMove={this.skew}
            onMouseOver={this.launchProgress}
            onMouseLeave={this.stopProgress}
            transform-origin='90 90' ref={e => {
              this.group = e
              if (e) {
                this.rect = e.getBoundingClientRect()
              }
            }}>
            <circle cx='90' cy='90' stroke='white' opacity='0.3' r='22.5' strokeWidth='1' fill='transparent' />
            <circle cx='90' cy='90' stroke='white' r='0.5' fill='white' />
            <circle className='donut__svg__circle--one' ref={progress => { this.progress = progress }} cx='90' cy='90' stroke='white' opacity='1' r='22.5' strokeWidth='1' fill='transparent' />
            <circle ref={e => { this.skewEl = e }} cx='90' cy='90' opacity='0.3' r='90' strokeWidth='1' fill='transparent' />
          </g>
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
        <Loader onLoad={e => {
            props.history.push('/loader')
          }} />
      </div>
    )
  }
}

export default Intro
