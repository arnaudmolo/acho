import React from 'react'
import { TweenMax } from 'gsap'
import inViewport from 'in-viewport'
import './ProjectPage.css'
import { oneProject, toSimpleProject } from './redux/projects'
// import arrow from './arrow-right.svg'
import Navigation from './Navigation'
import Project from './Project'
import GSComponent from './GSComponent'
import Cartouche from './Cartouche'

// const CTA = props =>
//   <div className='page--cta'>
//     <img className='page--arrow' alt='arrow' src={arrow} />
//   </div>

class ProjectPage extends GSComponent {
  constructor (props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.$galleryItems = []
    this.state = {
      showNext: false,
      xtra: false
    }
  }
  componentDidMount () {
    this.$container.addEventListener('scroll', this.handleScroll)

    this.timeline.pause()
      // .add(this.smallCover())
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
    const progress = scroll / end
    this.navigation.wrappedInstance.wrappedInstance.progress(progress)
    this.timeline.progress(progress)
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
    this.setState({xtra: true})
    setTimeout(() => {
      this.$container.scrollTo(0, 0)
      this.props.history.push('/project/' + this.props.nextProject.uid)
      this.setState({
        xtra: false
      })
    }, 1000)
  }
  render (props = this.props) {
    const project = toSimpleProject(props.project)
    return (
      <div>
        <Navigation ref={e => { this.navigation = e }} reset={this.state.xtra} />
        <div className='page--container' ref={e => { this.$container = e }}>
          <div className='page' ref={e => { this.$page = e }}>
            <div className='box'>
              <div className='box--content'>
                <Project
                  id={props.nextProject.id}
                  fullmode
                  xtra
                  showCover
                  className='page--project'
                  data={props.project.data} />
                <div className='page--info-container' ref={e => { this.$info = e }}>
                  <div className='page--info__columns'>
                    <Cartouche className='cartouche__year' xtra break title='year' data={[project.year]} />
                  </div>
                  <div className='page--info__columns'>
                    <Cartouche break className='cartouche__delivrables' xtra title='delivrables' data={project.delivrables} />
                    <Cartouche break className='cartouche__team' xtra title='team' data={project.team} />
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
                    xtra={this.state.xtra}
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
      </div>
    )
  }
}

export default oneProject(props => props.project ? <ProjectPage {...props} /> : <div />)
