import React from 'react'
import { TweenMax } from 'gsap'
import cx from 'classnames'
import inViewport from 'in-viewport'
import './ProjectPage.css'
import { oneProject } from './redux/projects'
import arrow from './arrow-right.svg'
import Project from './Project'
import GSComponent from './GSComponent'

const isNotEmpty = array => array.length >= 1
const cleanApi = (key, at, check) => array => {
  try {
    return check(array[0][key]) ? array.map(sub => sub[key][0][at]) : []
  } catch (e) {
    return []
  }
}

const cleanGallery = obj => obj.map(e => e.image_gallery.url)

const error = 'A mettre dans le backend'

const toSimpleProject = project => ({
  title: project.data.title[0].text,
  description_title: project.data.description_title[0] ? project.data.description_title[0].text : error,
  cover: project.data.cover.url,
  year: new Date(project.data.year).getFullYear(),
  services: cleanApi('service', 'text', isNotEmpty)(project.data.services),
  delivrables: cleanApi('delivrable', 'text', isNotEmpty)(project.data.delivrables),
  team: cleanApi('team_member', 'text', isNotEmpty)(project.data.team_members),
  description: project.data.description.map(e => e.text),
  gallery: cleanGallery(project.data.gallery)
})

const Cartouche = props =>
  props.data.length >= 1 ? <div className={cx('cartouche--container', props.className)}>
    <h6 className='cartouche--title'>{props.title}</h6>
    <p className='cartouche--text'>{
      props.data.map((item, index) =>
        <span className={cx({'cartouche--text__break': props.break})} key={item}>{item}{index !== props.data.length - 1 && ', '}</span>
      )}
    </p>
  </div> : null

const CTA = props =>
  <div className='page--cta'>
    <img className='page--arrow' alt='arrow' src={arrow} />
  </div>

class ProjectPage extends GSComponent {
  constructor (props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.$galleryItems = []
    this.state = {
      showNext: false
    }
  }
  componentDidMount () {
    this.$container.addEventListener('scroll', this.handleScroll)

    this.timeline.pause()
      .add(this.smallCover())
      .add(this.showText(), '-=2.5')
    this.$galleryItems.forEach((e, i) => this.timeline.add(this.hideGallery(i)).pause())
    this.timeline.add(this.$nextCover.onEnter()).pause()
  }
  handleScroll (e) {
    const scroll = e.target.scrollTop
    const end = this.$nextCover.$container.offsetLeft
    const coverIsIn = inViewport(this.$nextCover.$container)
    if (coverIsIn !== this.state.showNext) {
      this.setState({
        showNext: coverIsIn
      })
    }
    this.timeline.progress(scroll / end)
  }
  hideGallery (index) {
    return TweenMax.to(
      this.$galleryItems[index], 1, {
        scale: 1
      }
    )
  }
  showText () {
    return TweenMax.to(
      this.$info, 1.5, {
        scale: 1,
        alpha: 1
      }
    )
  }
  smallCover () {
    return TweenMax.to(
      this.$cover, 3, {
        scale: 0.8
      }
    )
  }
  handleLoad () {
    this.$container.scrollTo(0, 0)
    this.props.history.push('/project/' + this.props.nextProject.uid)
  }
  render (props = this.props) {
    if (!props.project) {
      return null
    }
    const project = toSimpleProject(props.project)
    // console.log('project:', project)
    return (
      <div className='page--container' ref={e => { this.$container = e }}>
        <div className='page' ref={e => { this.$page = e }}>
          <div className='box'>
            <div className='box--content'>
              <div className='page--text-container'>
                <p className='page--project'>Project</p>
                <h2 className='page--title'>{project.title}</h2>
                <Cartouche className='cartouche__services' title='services' data={project.services} />
                <CTA />
              </div>
              <div className='page--cover-container'>
                <img ref={e => { this.$cover = e }} alt='cover' src={project.cover} />
              </div>
              <div className='page--info-container' ref={e => { this.$info = e }}>
                <div className='page--info__columns'>
                  <Cartouche className='cartouche__year' break title='year' data={[project.year]} />
                </div>
                <div className='page--info__columns'>
                  <Cartouche break className='cartouche__delivrables' title='delivrables' data={project.delivrables} />
                  <Cartouche break className='cartouche__team' title='team' data={project.team} />
                </div>
                <div className='page--description-container'>
                  <h3 className='page--description-title'>{project.description_title}</h3>
                  {project.description.map(e =>
                    <p className='page--description-paragraph' key={e}>{e}</p>
                  )}
                </div>
              </div>
              <div className='page--gallery'>
                {project.gallery.map((image, index) =>
                  <div ref={e => { this.$galleryItems[index] = e }} key={image} className='page--gallery-item'>
                    <img alt='cover' src={image} />
                  </div>
                )}
              </div>
              <div className='page--next'>
                <Project
                  id={props.nextProject.id}
                  fullmode
                  showCover
                  loader={this.state.showNext}
                  onLoad={this.handleLoad.bind(this)}
                  className='page--project'
                  ref={e => { this.$nextCover = e }}
                  data={props.nextProject.data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default oneProject(props => props.project ? <ProjectPage {...props} /> : <div />)
