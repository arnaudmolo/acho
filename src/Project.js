import React from 'react'
import cx from 'classnames'
import Cover from './Cover'
import SlideInOut from './SlideInOut'
import GSComponent from './GSComponent'
import { TimelineMax } from 'gsap'
import './Project.css'

class Project extends GSComponent {
  constructor (props) {
    super(props)
    this.state = {
      model: props.data,
      id: props.id
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this.onExit().addCallback(() => {
        console.log('addCa')
        this.setState({
          model: this.props.data,
          id: this.props.id
        })
      })
    }
    if (this.state.id !== prevState.id) {
      this.onEnter()
    }
  }
  onEnter () {
    const timeline = new TimelineMax()
    if (this.props.fullmode) {
      const animations = []
      if (this.props.showCover) {
        animations.push(this.$title.fadeIn())
        animations.push(this.$chapo.fadeIn())
        animations.push(this.$cover.fadeIn())
      }
      return this.timeline.add(animations)
    }
    const animations = [
      this.$title.fadeIn(),
      this.$chapo.fadeIn()
    ]
    if (this.state.showCover) {
      animations.push(this.$cover.fadeIn())
    }
    return this.timeline.add(animations)
  }
  onExit () {
    const timeline = new TimelineMax()
    if (this.props.fullmode) {
      if (this.props.showCover) {
        return this.timeline.add([
          this.$title.fadeOut(),
          this.$chapo.fadeOut(),
          this.$cover.fadeOut()
        ])
      }
      return this.timeline.add(this.$cover.fadeOut())
    }
    return timeline.add([
      this.$title.fadeOut(),
      this.$chapo.fadeOut(),
      this.$cover.fadeOut()
    ])
  }
  render (props = this.props) {
    const title = this.state.model.title[0].text
    let textVisible = true
    if (props.fullmode) {
      textVisible = props.showCover
    }
    return (
      <div className={cx('projects-project', props.className)} ref={e => { this.$container = e }}>
        <div ref={e => { this.$project = e }} className={cx({
          project: true,
          project__small: !props.fullmode,
          project__full: props.fullmode && props.showCover
        })}>
          <div className='project--titraille'>
            <SlideInOut ref={e => { this.$chapo = e }} visible={textVisible}>
              <p className='project__chapo'>project</p>
            </SlideInOut>
            <SlideInOut ref={e => { this.$title = e }} visible={textVisible}>
              <h1 className='project--title'>{title}</h1>
            </SlideInOut>
          </div>
          <Cover
            ref={e => { this.$cover = e }}
            src={this.state.model.cover.url}
            visible={this.props.showCover}
            fullmode={props.fullmode} />
        </div>
      </div>
    )
  }
}

export default Project
