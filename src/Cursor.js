import React from 'react'
import cx from 'classnames'
import { TweenMax } from 'gsap'
import connectToCursor from './redux/cursor'
import './Cursor.css'

class Cursor extends React.Component {
  componentDidMount () {
    window.addEventListener('mousemove', (e) => {
      TweenMax.to(
        this.$container, 0.1, {
          x: e.pageX - 20,
          y: e.pageY - 20
        }
      )
    })
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.cursor && !prevProps.cursor) {
      TweenMax.to(
        this.$container, 1, {
          scale: 1
        }
      )
    }
    if (!this.props.cursor && prevProps.cursor) {
      TweenMax.to(
        this.$container, 1, {
          scale: 2
        }
      )
    }
  }
  render (props = this.props) {
    return (
      <div className={cx('cursor--container', !props.cursor && 'cursor--container__hidden')} ref={e => { this.$container = e }}>
        <svg height={40} width={40}>
          <circle cx={20} cy={20} r={10} strokeOpacity='0.3' stroke='white' strokeWidth='1' fill='none' />
        </svg>
      </div>
    )
  }
}

export default connectToCursor(Cursor)
