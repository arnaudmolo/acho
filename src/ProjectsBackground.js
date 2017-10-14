import React from 'react'
import GSComponent from './GSComponent'
import './ProjectsBackground.css'

class Background extends GSComponent {
  constructor (props) {
    super(props)
    this.state = {
      background: props.src
    }
  }
  componentDidMount () {
    this.show()
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.src !== prevProps.src) {
      this.hide(this.props)
    }
    if (this.state.background !== prevState.background) {
      this.show(this.props)
    }
  }
  hide (props) {
    this.timeline.to(this.$background, 1, {
      alpha: 0,
      onComplete: () =>
        this.setState({
          background: props.src
        })
    })
  }
  show (props) {
    this.timeline.to(this.$background, 1, {
      alpha: 0.3
    })
  }
  render () {
    return <div
      ref={e => { this.$background = e }}
      className='background-container'
      style={{backgroundImage: `url(${this.state.background})`}} />
  }
}

export default Background
