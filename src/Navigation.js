import React from 'react'
import connectToProjects from './redux/projects'
import './Navigation.css'

const circleRadius = 22.5

const translate = (x, y) => `translate(${x}, ${y})`

class Circle extends React.Component {
  render (props = this.props) {
    const cx = 50
    return (
      <g>
        <circle cx={cx} cy={props.cy} stroke='white' opacity='0.3' r={circleRadius} strokeWidth='1' fill='transparent' />
        <circle cx={cx} cy={props.cy} stroke='white' r='0.5' fill='white' />
        <circle className='donut__svg__circle--one' ref={progress => { this.progress = progress }} cx={cx} cy={props.cy} stroke='white' opacity='1' r={circleRadius} strokeWidth='1' fill='transparent' />
        <circle ref={e => { this.skewEl = e }} cx={cx} cy={props.cy} opacity='0.3' r={circleRadius * 2} strokeWidth='1' fill='transparent' />
      </g>
    )
  }
}

class Navigation extends React.Component {
  render (props = this.props) {
    const totalHeight = 500
    return (
      <nav className='navigation-container'>
        <svg height={totalHeight + circleRadius * 4} width='100'>
          <g transform={translate(0, circleRadius * 3)}>
            {props.projects.map((project, index) => {
              return (
                <Circle cy={index * circleRadius * 4} data={project.data} key={project.id} />
              )
            })}
          </g>
        </svg>
      </nav>
    )
  }
}

export default connectToProjects(Navigation)
