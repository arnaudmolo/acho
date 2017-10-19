import React from 'react'
import Transition from 'react-transition-group/Transition'
import { Motion, spring } from 'react-motion'
import { scaleLinear } from 'd3'
import cx from 'classnames'
import connectToProjects from './redux/projects'
import { onlyActions as connectToCursor } from './redux/cursor'
import './Navigation.css'
import GSComponent from './GSComponent'
import { TweenMax } from 'gsap'

const circleRadius = 22.5
const totalHeight = 500

const translate = (x, y) => `translate(${x}, ${y})`
const xScale = scaleLinear().range([totalHeight - 22.5, 22.5]).domain([0, 5])
const scale = scaleLinear().range([-22.5, 22.5]).domain([0, 90])

const ok = (visible) => visible !== 'exiting' && visible !== 'exited'

class Circle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }
  startProgress () {
    this.props.onMouseEnter()
  }
  followCursor (e) {
    this.setState({
      x: scale(e.pageX - this.rect.x),
      y: scale(e.pageY - this.rect.y)
    })
  }
  backToPosition (e) {
    this.props.onMouseLeave()
    this.setState({
      x: 0,
      y: 0
    })
  }
  render (props = this.props) {
    const cx = 50
    return (
      <Motion defaultStyle={{
        r: 5,
        x: 0,
        y: 0,
        dashOffset: 221,
        r2: circleRadius
      }} style={{
        r: spring((props.selected || props.progress) ? 10 : props.in ? 5 : 0),
        x: spring(this.state.x),
        y: spring(this.state.y),
        dashOffset: spring(props.progress ? 80 : 221, {stiffness: 35, damping: 13}),
        r2: spring(props.progress ? circleRadius : 0)
      }} onRest={props.onFinish}>
        {i10 => <g
          onMouseMove={this.followCursor.bind(this)}
          onMouseLeave={this.backToPosition.bind(this)}
          onMouseEnter={this.startProgress.bind(this)}
          className='intro-loader__container'
          transform-origin='90 90'
          transform={translate(i10.x, i10.y)}
          ref={e => {
            if (e) {
              this.rect = e.getBoundingClientRect()
            }
          }}>
          <circle
            cx={cx}
            cy={props.cy}
            stroke='white'
            opacity='0.3'
            r={i10.r}
            strokeWidth='1'
            fill='transparent' />
          <circle
            cx={cx}
            cy={props.cy}
            stroke='white' r={i10.r / 10} fill='white' />
          <circle
            strokeDashoffset={i10.dashOffset}
            r={i10.r2}
            className='donut__svg__circle--one'
            cx={cx}
            cy={props.cy}
            stroke='white' opacity='1' strokeWidth='1' fill='transparent' />
          <circle
            cx={cx} cy={props.cy} opacity='1'
            r={props.progress ? circleRadius * 2 : circleRadius} strokeWidth='1' fill='transparent' />
        </g>}
      </Motion>
    )
  }
}

class Mask extends React.Component {
  render (props = this.props) {
    const cx = 50
    return (
      <Motion defaultStyle={{
        r: 5,
        r2: circleRadius
      }} style={{
        r2: spring(props.progress ? circleRadius : 0),
        r: spring((props.selected || props.progress) ? 10 : props.in ? 5 : 0)
      }}>
        {i10 => <g><circle
          cx={cx}
          cy={props.cy}
          r={i10.r}
          fill='black' />
          <circle
            cx={cx}
            cy={props.cy}
            r={i10.r2}
            fill='black' />
        </g>}
      </Motion>
    )
  }
}

const visible = (state, selected, index, fullmode) => {
  if (fullmode) {
    return selected === index
  }
  return ok(state)
}

class Timeline extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: false
    }
  }
  onMouseEnter (index) {
    return (e) => {
      this.setState({
        progress: index
      })
      this.props.onMouseEnter(e)
    }
  }
  onMouseLeave (e) {
    this.setState({progress: false})
    this.props.onMouseLeave(e)
  }
  onFinish (index) {
    return () => {
      if (this.state.progress === index) {
        this.props.goTo(this.state.progress)
      }
    }
  }
  render (props = this.props) {
    return (
      <Transition in={props.in} timeout={1100}>
        {state =>
          <svg
            className='navigation--scene'
            height={totalHeight + 100}
            width='100'>
            <defs>
              <mask id='mask'>
                <rect x={0} y={0} width='100' height='600' fill='white' />
                <g transform={translate(0, circleRadius * 3)}>
                  {state !== 'exited' && props.projects.map((project, index) => {
                    return (
                      <Mask
                        key={index}
                        in={visible(state, props.selected, index, props.fullmode)}
                        selected={props.selected === index}
                        progress={this.state.progress === index}
                        cy={xScale(index)} />
                    )
                  })}
                </g>
              </mask>
            </defs>
            <rect x={49} y={0} height={600} width={2} fill='white' mask='url(#mask)' fillOpacity='0.3' />
            <g transform={translate(0, circleRadius * 3)}>
              {state !== 'exited' && props.projects.map((project, index) => {
                return (
                  <Circle
                    onFinish={this.onFinish(index)}
                    onMouseEnter={this.onMouseEnter(index)}
                    onMouseLeave={this.onMouseLeave.bind(this)}
                    key={index}
                    in={visible(state, props.selected, index, props.fullmode)}
                    selected={props.selected === index}
                    progress={this.state.progress === index}
                    cy={xScale(index)}
                    data={project.data} />
                )
              })}
            </g>
          </svg>
        }
      </Transition>
    )
  }
}

class Navigation extends GSComponent {
  componentDidUpdate (prevProps, prevState) {
    if (this.props.reset) {
      TweenMax.to(this.$loader, 1, {
        css: {
          height: '0%'
        }
      })
    }
  }
  componentDidMount () {
    this.timeline.fromTo(
      this.$loader, 1, {
        css: {
          height: '0%'
        }
      }, {
        css: {
          height: '100%'
        }
      }
    ).pause()
  }
  progress (t) {
    this.timeline.progress(t)
  }
  render (props = this.props) {
    if (props.circles) {
      return (
        <nav className={cx('navigation-container', !props.circles && 'navigation-container__full')} onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave}>
          <div className='navigation--title'><p>achaufaille</p></div>
          <div className='navigation--bar'>
            <div className='navigation--loader' ref={e => { this.$loader = e }} />
          </div>
          <Timeline in={props.circles}
            {...props}
            onMouseEnter={props.hideCursor}
            onMouseLeave={props.showCursor} />
          <div className='navigation--bar'>
            <div className='navigation--loader' />
          </div>
        </nav>
      )
    } else {
      return (
        <nav className={cx('navigation-container', !props.circles && 'navigation-container__full')} onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave}>
          <div className='navigation--title'><p>achaufaille</p></div>
          <div className='navigation--bar'>
            <div className='navigation--loader' ref={e => { this.$loader = e }} />
          </div>
        </nav>
      )
    }
  }
}

export default connectToProjects(connectToCursor(Navigation))
