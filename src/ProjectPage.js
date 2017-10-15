import React from 'react'
import { TweenMax } from 'gsap'
import cx from 'classnames'
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

const Cartouche = props =>
  <div className={cx('cartouche--container', props.className)}>
    <h6 className='cartouche--title'>{props.title}</h6>
    <p className='cartouche--text'>{
      props.data.map((item, index) =>
        <span className={cx({'cartouche--text__break': props.break})} key={item}>{item}{index !== props.data.length - 1 && ', '}</span>
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
    const scroll = e.target.scrollTop
    if (scroll > 60) {
      this.smallCover()
    }
  }
  smallCover () {
    return TweenMax.to(
      this.$cover, 3, {
        scale: 0.8
      }
    )
  }
  render (props = this.props) {
    if (!props.project) {
      return null
    }
    const project = toSimpleProject(props.project)
    return (
      <div className='page--container' ref={e => { this.$container = e }}>
        <div className='page' ref={e => { this.$page = e }}>
          <div className='box'>
            <div className='box--content'>
              <div className='page--text-container'>
                <p className='page--project'>Project</p>
                <h2 className='page--title'>{project.title}</h2>
                {project.services.length >= 1 && <Cartouche className='cartouche__services' title='services' data={project.services} />}
                <CTA />
              </div>
              <div className='page--cover-container'>
                <img ref={e => { this.$cover = e }} alt='cover' src={project.cover} />
              </div>
              <div className='page--info-container'>
                <div className='page--info__columns'>
                  <Cartouche className='cartouche__year' break title='year' data={[2016]} />
                </div>
                <div className='page--info__columns'>
                  <Cartouche break className='cartouche__delivrables' title='delivrables' data={['UX', 'Visual studio', 'Creative direction']} />
                  <Cartouche break className='cartouche__team' title='team' data={['Hugo Teilleit', 'Sebastien Lambla']} />
                </div>
                <div className='page--description-container'>
                  <h3 className='page--description-title'>Lorem ipsum dolor sit amet, consectetur lorem</h3>
                  <p className='page--description-paragraph'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p className='page--description-paragraph'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default oneProject(props => props.project ? <ProjectPage {...props} /> : <div />)
