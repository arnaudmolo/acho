import { PureComponent } from 'react'
import { TimelineMax } from 'gsap'

class TweenComponent extends PureComponent {
  timeline = new TimelineMax()
  componentWillUnmount () {
    this.timeline.stop()
  }
}

export default TweenComponent
