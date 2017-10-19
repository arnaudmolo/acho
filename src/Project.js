import React from 'react'
import cx from 'classnames'
import Cover from './Cover'
import SlideInOut from './SlideInOut'
import GSComponent from './GSComponent'
import { TimelineMax } from 'gsap'
import './Project.css'
import { toSimpleProject } from './redux/projects'
import Cartouche from './Cartouche'
import Loader from './ProjectLoader'

class Project extends GSComponent {
  constructor (props) {
    super(props)
    this.state = {
      model: props.data,
      id: props.id
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.mountOnEnter) {
      if (this.props.id !== prevProps.id) {
        this.timeline = this.onExit().addCallback(() => {
          this.setState({
            model: this.props.data,
            id: this.props.id
          })
        })
      }
      if (this.state.id !== prevState.id) {
        this.timeline = this.onEnter()
      }
    } else if (this.props.id !== this.state.id) {
      this.setState({
        model: this.props.data,
        id: this.props.id
      })
    }
  }
  onEnter () {
    const timeline = new TimelineMax()
    if (this.props.fullmode) {
      const animations = []
      if (this.props.showCover) {
        animations.push(this.$title.fadeIn())
        animations.push(this.$chapo.fadeIn())
        animations.push(this.$cartouche.fadeIn())
        animations.push(this.$cover.fadeIn())
      }
      return timeline.add(animations)
    }
    const animations = [
      this.$title.fadeIn(),
      this.$cartouche.fadeIn(),
      this.$chapo.fadeIn()
    ]
    if (this.state.showCover) {
      animations.push(this.$cover.fadeIn())
    }
    return timeline.add(animations)
  }
  onExit () {
    const timeline = new TimelineMax()
    if (this.props.fullmode) {
      if (this.props.showCover) {
        return timeline.add([
          this.$title.fadeOut(),
          this.$chapo.fadeOut(),
          this.$cartouche.fadeOut(),
          this.$cover.fadeOut()
        ])
      }
      return timeline.add(this.$cover.fadeOut())
    }
    return timeline.add([
      this.$title.fadeOut(),
      this.$chapo.fadeOut(),
      this.$cartouche.fadeOut(),
      this.$cover.fadeOut()
    ])
  }
  render (props = this.props) {
    const title = this.state.model.title[0].text
    const project = toSimpleProject({data: this.state.model})
    let textVisible = true
    if (props.fullmode) {
      textVisible = props.showCover
    }
    return (
      <div className={cx('projects-project', props.className, this.props.xtra && 'xtra')} ref={e => { this.$container = e }}>
        <div ref={e => { this.$project = e }} className={cx({
          project: true,
          project__small: !props.fullmode,
          project__full: props.fullmode && props.showCover
        })}>
          <div className='project--titraille'>
            <SlideInOut ref={e => { this.$chapo = e }} mountOnEnter={props.mountOnEnter} visible={textVisible}>
              <p className='project__chapo'>project</p>
            </SlideInOut>
            <SlideInOut ref={e => { this.$title = e }} mountOnEnter={props.mountOnEnter} visible={textVisible}>
              <h1 className='project--title'>{title}</h1>
            </SlideInOut>
            <SlideInOut ref={e => { this.$cartouche = e }} mountOnEnter={props.mountOnEnter} visible={textVisible}>
              <Cartouche xtra={props.xtra} className='services__delivrables' title='services' data={project.services} />
            </SlideInOut>
          </div>
          <Cover
            mountOnEnter={props.mountOnEnter}
            ref={e => { this.$cover = e }}
            src={this.state.model.cover.url}
            visible={this.props.showCover}
            fullmode={props.fullmode} />
        </div>
        <Loader in={props.loader && this.props.id === this.state.id} onLoad={props.onLoad} />
      </div>
    )
  }
}

export default Project
