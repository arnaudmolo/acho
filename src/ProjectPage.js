import React from 'react'
import './ProjectPage.css'
import { oneProject } from './redux/projects'
import arrow from './arrow-right.svg'

const toSimpleProject = project => ({
  title: project.data.title[0].text,
  cover: project.data.cover.url,
  year: project.data.year,
  services: project.data.services[0].service.length >= 1 ? project.data.services.map(({service}) =>
    service[0].text
  ) : []
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

const CTA = props =>
  <div className='page--cta'>
    <img className='page--arrow' alt='arrow' src={arrow} />
  </div>

class ProjectPage extends React.Component {
  constructor (props) {
    super(props)
    this.handleResize = this.handleResize.bind(this)
  }
  componentDidMount () {
    this.$container.addEventListener('scroll', this.handleResize)
  }
  handleResize (e) {
    console.log(e)
  }
  render (props = this.props) {
    if (!props.project) {
      return null
    }
    const project = toSimpleProject(props.project)
    return (
      <div className='page--container' ref={e => { this.$container = e }}>
        <div className='page'>
          <div className='box'>
            <div className='box--content'>
              <div className='page--text-container'>
                <p className='page--project'>Project</p>
                <h2 className='page--title'>{project.title}</h2>
                {project.services.length >= 1 && <Services services={project.services} />}
                <CTA />
              </div>
              <div className='page--cover-container'><img alt='cover' src={project.cover} /></div>
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

export default oneProject(props => props.project ? <ProjectPage {...props} /> : <div />)
