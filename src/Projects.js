import React from 'react'
import Prismic from 'prismic-javascript'
import cx from 'classnames'
import GSComponent from './GSComponent'

import './Projects.css'
// import Project from './Project'

class SlideInOut extends GSComponent {
  componentDidMount () {
    this.timeline
      .fromTo(this.$el, 0.66, {
        yPercent: -100
      }, {
        yPercent: 0
      })
  }
  render () {
    return (
      <div className='slide__container'>
        <div className='slide__content' ref={e => { this.$el = e }}>{this.props.children}</div>
      </div>
    )
  }
}

class Cover extends GSComponent {
  componentDidMount () {
    console.log(this.props)
    if (this.props.visible) {
      this.fadeIn(this.props)
    }
  }
  fadeOut (props) {

  }
  fadeIn (props) {
    this.timeline.fromTo(this.$cover, 1, {
      alpha: 0,
      height: 0
    }, {
      alpha: 1,
      height: 280
    })
  }
  render (props = this.props) {
    return (
      <div ref={e => { this.$cover = e }} className='project__cover'>
        <img alt='cover' className='project__image' src={props.src} />
      </div>
    )
  }
}

class Project extends GSComponent {
  render (props = this.props) {
    const title = props.data.title[0].text
    return (
      <div ref={e => { this.$project = e }} className='project'>
        <div className='project__titraille'>
          <SlideInOut>
            <p className='project__chapo'>project</p>
          </SlideInOut>
          <SlideInOut>
            <h1 ref={e => { this.$title = e }} className='project__title'>{title}</h1>
          </SlideInOut>
          {props.data.services.length > 1
            ? <div>
              <h4>Services</h4>
              <ul>
                {props.data.services.map(({service}) =>
                  <li key={service[0].text}><p>{service[0].text}</p></li>
                )}
              </ul>
            </div>
          : null}
        </div>
        <Cover src={props.data.cover.url} visible={props.showCover} />
      </div>
    )
  }
}

class Projects extends GSComponent {
  constructor (props) {
    super(props)
    this.state = {
      projects: []
    }
  }

  componentDidMount () {
    this.load(this.props)
  }

  load (props) {
    props.api.query(
      Prismic.Predicates.at('document.type', 'project')
    ).then(response => {
      this.setState({
        projects: response.results
      })
    })
  }

  render (props = this.props) {
    let selected = 2
    return (
      <div className='projects'>
        {this.state.projects.map((project, index) =>
          <div key={project.id} className={cx({
            'projects-project': true,
            'projects-project__selected': selected === index
          })}>
            <Project data={project.data} showCover={selected === index} />
          </div>
        )}
      </div>
    )
  }
}

export default Projects
