import React, { Component } from 'react'
import Prismic from 'prismic-javascript'
import cx from 'classnames'

import './Projects.css'
// import Project from './Project'

class Project extends React.Component {
  render (props = this.props) {
    console.log(props.data)
    const title = props.data.title[0].text
    return (
      <div className='project'>
        <div className='project__titraille'>
          <p className='project__chapo'>project</p>
          <h1 className='project__title'>{title}</h1>
          {props.data.services.length > 1 ?
            <div>
              <h4>Services</h4>
              <ul>
                {props.data.services.map(({service}) =>
                  <li key={service[0].text}><p>{service[0].text}</p></li>
                )}
              </ul>
            </div>
          : null}
        </div>
        <div className='project__cover'>
          <img alt={`${title} cover`} className='project__image' src={props.data.cover.url} />
        </div>
      </div>
    )
  }
}

class Projects extends Component {
  state = {
    projects: []
  }
  componentDidMount () {
    this.load(this.props)
    this.animate(this.props)
  }

  animate (props) {

  }

  load (props) {
    props.api.query(
      Prismic.Predicates.at('document.type', 'project')
    ).then( response => {
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
            <Project data={project.data} />
          </div>
        )}
      </div>
    )
  }
}

export default Projects
