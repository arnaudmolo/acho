import React, { Component } from 'react'
import { interpolate } from 'flubber'
import { TimelineMax } from 'gsap'

const A = 'M234.5,288.9h-66.6l-15,57.7H99.1L174.7,80h53.4l75.6,266.5h-54L234.5,288.9z M178.5,248.2h45.4l-22.1-84.6h-1.1 L178.5,248.2z'
const R = 'M167.9,239.6v106.9h-51.6V80.2h79.8c26.5,0,47.3,6.9,62.5,20.7c15.2,13.8,22.8,33,22.8,57.7 c0,13.8-3.2,25.7-9.6,35.9c-6.4,10.1-15.7,18.2-27.7,24.2c13.9,4.6,23.9,12.3,30,23.1c6.1,10.7,9.2,24.2,9.2,40.3v19.4 c0,7.4,0.9,15.3,2.6,23.4c1.7,8.2,4.8,14.2,9.2,17.9v3.8h-53.4c-4.3-3.9-7-10.3-8.1-19.1c-1.2-8.8-1.7-17.7-1.7-26.5v-18.7 c0-13.5-2.8-24-8.4-31.5c-5.6-7.4-13.7-11.2-24.2-11.2H167.9z M167.9,199.4h27.8c11.1,0,19.6-3.3,25.4-10 c5.8-6.6,8.7-16.1,8.7-28.3c0-12.4-2.9-22.3-8.6-29.7c-5.7-7.3-14.1-11-25.1-11h-28.2V199.4z'

const interpolator = interpolate(A, R)

class Loader extends Component {
  componentDidMount () {
    this.timeline = new TimelineMax({
      paused: false
    })
    this.timeline.to(this.shape, 3, {
      onUpdate: () => this.shape.setAttribute('d', interpolator(this.timeline.progress()))
    })
  }

  render (props = this.props) {
    return (
      <svg version='1.1' x='0px' y='0px' viewBox='0 0 605.3 627.7'>
        <g>
          <path ref={shape => { this.shape = shape }}
            d='M234.5,288.9h-66.6l-15,57.7H99.1L174.7,80h53.4l75.6,266.5h-54L234.5,288.9z M178.5,248.2h45.4l-22.1-84.6h-1.1 L178.5,248.2z'
            fill='white'
          />
        </g>
      </svg>

    )
  }
}

export default Loader
