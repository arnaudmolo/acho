import React from 'react'
import { scaleLinear } from 'd3'
import connectToProjects from './redux/projects'
import './Navigation.css'
import GSComponent from './GSComponent'
import { TweenMax } from 'gsap'

const circleRadius = 22.5

const translate = (x, y) => `translate(${x}, ${y})`
const scale = scaleLinear().range([-22.5, 22.5]).domain([0, 90])

class Circle extends GSComponent {
  skew (e) {
    this.timeline.to(
      this.group, 1, {
        x: scale(e.pageX - this.rect.x),
        y: scale(e.pageY - this.rect.y)
      }, 0
    ).play()
  }
  leave (e) {
    this.timeline.reverse()
  }
  enter () {
    const animations = [
      TweenMax.to(this.progress, 1, {
        'stroke-dashoffset': 80,
        attr: {
          r: circleRadius
        },
        onComplete: this.props.onFinish
      }),
      TweenMax.to(this.skewEl, 1, {
        attr: {
          r: circleRadius
        }
      })
    ]
    this.timeline.add(animations)
  }
  render (props = this.props) {
    const cx = 50
    return (
      <g
        onMouseMove={this.skew.bind(this)}
        onMouseLeave={this.leave.bind(this)}
        onMouseEnter={this.enter.bind(this)}
        className='intro-loader__container'
        transform-origin='90 90' ref={e => {
          this.group = e
          if (e) {
            this.rect = e.getBoundingClientRect()
          }
        }}>
        <circle ref={e => { this.skewEl = e }} cx={cx} cy={props.cy} stroke='white' opacity='0.3' r={5} strokeWidth='1' fill='transparent' />
        <circle cx={cx} cy={props.cy} stroke='white' r='0.5' fill='white' />
        <circle className='donut__svg__circle--one' ref={progress => { this.progress = progress }} cx={cx} cy={props.cy} stroke='white' opacity='1' r={5} strokeWidth='1' fill='transparent' />
        <circle cx={cx} cy={props.cy} opacity='0.3' r={circleRadius * 2} strokeWidth='1' fill='transparent' />
      </g>
    )
  }
}

class Navigation extends React.Component {
  render (props = this.props) {
    const totalHeight = 500
    return (
      <nav className='navigation-container' onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave}>
        <svg height={totalHeight + circleRadius * 4} width='100'>
          <g transform={translate(0, circleRadius * 3)}>
            {props.projects.map((project, index) => {
              return (
                <Circle onFinish={e => props.goTo(index)} cy={index * circleRadius * 4} data={project.data} key={index} />
              )
            })}
          </g>
        </svg>
      </nav>
    )
  }
}

export default connectToProjects(Navigation)
