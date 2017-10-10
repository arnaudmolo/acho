import { Component } from 'react'
import { TimelineMax } from 'gsap'

class TweenComponent extends Component {
  timeline = new TimelineMax()
  componentWillUnmount () {
    this.timeline.stop()
  }
}

export default TweenComponent
