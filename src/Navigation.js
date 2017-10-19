import React from 'react'
import Transition from 'react-transition-group/Transition'
import { scaleLinear } from 'd3'
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

class CirclePolymorph extends GSComponent {
  componentDidMount () {
    if (this.props.in) {
      this.show()
    } else {
      this.hide()
    }
    if (this.props.selected) {
      this.select()
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.selected && !prevProps.selected) {
      // console.log(this.props.selected)
      this.select()
    }
    if (prevProps.selected && !this.props.selected) {
      this.unselect()
    }
    if (this.props.in && !prevProps.in) {
      this.show()
    } else if (!this.props.in && prevProps.in) {
      this.hide()
    }
  }
  unselect () {
    TweenMax.to(
      this.$skew, 1, {
        attr: {
          r: 5
        }
      }
    )
  }
  select () {
    TweenMax.to(
      this.$skew, 1, {
        attr: {
          r: 15
        }
      }
    )
  }
  show () {
    TweenMax.to(
      this.group, 1, {
        alpha: 1
      }
    )
    TweenMax.to(
      this.$skew, 1, {
        attr: {
          r: 5
        }
      }
    )
  }
  hide () {
    TweenMax.to(
      this.group, 1, {
        alpha: 0
      }
    )
    TweenMax.to(
      this.$skew, 1, {
        attr: {
          r: 5
        }
      }
    )
  }
}

class Circle extends CirclePolymorph {
  startProgress () {
    this.props.onMouseEnter()
    this.timeline.add([
      TweenMax.to(this.progress, 1, {
        'stroke-dashoffset': 80,
        attr: {
          r: circleRadius
        },
        onComplete: this.props.onFinish
      }),
      TweenMax.to(this.$skew, 1, {
        attr: {
          r: 10
        }
      }),
      TweenMax.to(this.$zone, 0, {
        attr: {
          r: circleRadius * 2
        }
      })
    ]).play().timeScale(1)
  }
  followCursor (e) {
    TweenMax.to(
      this.group, 1, {
        x: scale(e.pageX - this.rect.x),
        y: scale(e.pageY - this.rect.y)
      }, 0
    )
  }
  backToPosition (e) {
    this.props.onMouseLeave()
    this.timeline.timeScale(2).reverse()
    TweenMax.to(
      this.group, 1, {
        x: 0,
        y: 0
      }, 0
    )
  }
  render (props = this.props) {
    const cx = 50
    return (
      <g
        onMouseMove={this.followCursor.bind(this)}
        onMouseLeave={this.backToPosition.bind(this)}
        onMouseEnter={this.startProgress.bind(this)}
        className='intro-loader__container'
        transform-origin='90 90'
        ref={e => {
          this.group = e
          if (e) {
            this.rect = e.getBoundingClientRect()
          }
        }}>
        <circle
          ref={e => { this.$skew = e }}
          cx={cx}
          cy={props.cy}
          stroke='white'
          opacity='0.3'
          r='5'
          strokeWidth='1'
          fill='transparent' />
        <circle
          cx={cx}
          cy={props.cy}
          stroke='white' r='0.5' fill='white' />
        <circle
          ref={progress => { this.progress = progress }}
          className='donut__svg__circle--one'
          cx={cx}
          cy={props.cy}
          stroke='white' opacity='1' r='5' strokeWidth='1' fill='transparent' />
        <circle ref={e => { this.$zone = e }}
          cx={cx} cy={props.cy} opacity='1'
          r={circleRadius} strokeWidth='1' fill='transparent' />
      </g>
    )
  }
}

class Mask extends CirclePolymorph {
  render (props = this.props) {
    const cx = 50
    return (
      <circle
        ref={e => { this.$skew = this.group = e }}
        cx={cx}
        cy={props.cy}
        stroke='white'
        r='15'
        strokeWidth='1'
        fill='black' />
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
  render (props = this.props) {
    return (
      <Transition in={props.in} timeout={1100}>
        {state =>
          <svg
            className='navigation--scene'
            height={totalHeight + 100}
            width='100'>
            <g transform={translate(0, circleRadius * 3)}>
              {state !== 'exited' && props.projects.map((project, index) => {
                return (
                  <Circle
                    onMouseEnter={props.onMouseEnter}
                    onMouseLeave={props.onMouseLeave}
                    key={index}
                    in={visible(state, props.selected, index, props.fullmode)} selected={props.selected === index}
                    onFinish={e => props.goTo(index)}
                    cy={xScale(index)}
                    data={project.data} />
                )
              })}
            </g>
            <defs>
              <mask id='mask'>
                <rect x={0} y={0} width='100' height='600' fill='white' />
                <g transform={translate(0, circleRadius * 3)}>
                  {state !== 'exited' && props.projects.map((project, index) => {
                    return (
                      <Mask
                        key={index}
                        in={visible(state, props.selected, index, props.fullmode)} selected={props.selected === index}
                        cy={xScale(index)} />
                    )
                  })}
                </g>
              </mask>
            </defs>
            <rect ref={e => { this.$progress = e }} x={49} y={0} height={0} width={2} fill='white' mask='url(#mask)' />
            <rect x={49} y={0} height={600} width={2} fill='white' mask='url(#mask)' fillOpacity='0.3' />
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
      this.$loader1, 1, {
        css: {
          height: '0%'
        }
      }, {
        css: {
          height: '100%'
        }
      }
    ).fromTo(
      this.$timeline.$progress, 15, {
        attr: {
          height: 0
        }
      }, {
        attr: {
          height: 600
        }
      }
    ).fromTo(
      this.$loader2, 1, {
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
    return (
      <nav className='navigation-container' onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave}>
        <div className='navigation--title'><p>achaufaille</p></div>
        <div className='navigation--bar'>
          <div className='navigation--loader' ref={e => { this.$loader1 = e }} />
        </div>
        <Timeline in={props.circles}
          {...props}
          ref={e => { this.$timeline = e }}
          onMouseEnter={props.hideCursor}
          onMouseLeave={props.showCursor} />
        <div className='navigation--bar'>
          <div className='navigation--loader' ref={e => { this.$loader2 = e }} />
        </div>
      </nav>
    )
  }
}

export default connectToProjects(connectToCursor(Navigation))
