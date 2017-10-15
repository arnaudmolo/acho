import React from 'react'
import './ProjectPage.css'
import { oneProject } from './redux/projects'

const toSimpleProject = project => ({
  title: project.data.title[0].text,
  cover: project.data.cover.url,
  year: project.data.year,
  services: project.data.services.map(({service}) =>
    service[0].text
  )
})

const Services = props =>
  <div className='page--services'>
    <h6 className='page--services-title'>Services</h6>
    <p className='page--service'>{
      props.services.map((service, index) =>
        <span key={service}>{service}{index !== props.services.length - 1 && ', '}</span>
      )}
    </p>
  </div>

class ProjectPage extends React.Component {
  render (props = this.props) {
    if (!props.project) {
      return null
    }
    const project = toSimpleProject(props.project)
    return (
      <div className='page--container'>
        <div className='page'>
          <div className='box'>
            <div className='box--content'>
              <div className='page--text-container'>
                <p className='page--project'>Project</p>
                <h2 className='page--title'>{project.title}</h2>
                {project.services.length >= 1 && <Services services={project.services} />}
              </div>
              <img alt='cover' src={project.cover} />
            </div>
          </div>
          <div className='box' />
          <div className='box' />
          <div className='box' />
        </div>
      </div>
    )
  }
}

export default oneProject(ProjectPage)
