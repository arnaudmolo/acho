import React from 'react'
import { Motion, spring } from 'react-motion'
import { TweenMax } from 'gsap'
import GSComponent from './GSComponent'
import connectLoader from './redux/loader'
import './Loader.css'
import Cover from './Cover'
import loaderBg from './intro-loader-background.jpg'

let rafId = 0
function processFrame (video, buffer, output) {
  buffer.drawImage(video, 0, 0)
  const image = buffer.getImageData(0, 0, width, height)
  const alphaData = buffer.getImageData(0, height, width, height).data
  for (let i = 3, len = image.data.length; i < len; i = i + 4) {
    image.data[i] = alphaData[i - 1]
  }
  output.putImageData(image, 0, 0, 0, 0, width, height)
  rafId = window.requestAnimationFrame(() => processFrame(video, buffer, output))
}

const width = 350
const height = 900 / 2

class Loader extends GSComponent {
  constructor (props) {
    super(props)
    this.state = {
      animating: true
    }
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(rafId)
  }

  videoDidMount () {
    TweenMax.to(this.output, 1, {
      alpha: 0.2,
      delay: 1,
      onComplete: () => this.startAnimation()
    })
  }

  startAnimation () {
    this.video.play()
    this.timeline.to(this.container, 1, {
      css: {
        x: 0
      },
      ease: window.Power2.easeOut
    })
    .fromTo(this.laodingText, 1, {
      x: 276
    }, {
      x: 0,
      ease: window.Power2.easeOut,
      onComplete: () => this.setState({animating: false})
    }, '-=1')
  }

  componentDidMount () {
    this.video.addEventListener(this.video, 'progress', () => console.log('azezae'))
    const output = this.output.getContext('2d')
    output.globalCompositeOperation = 'screen'
    processFrame(this.video, this.buffer.getContext('2d'), output)
    this.videoDidMount()
  }

  endAnimation () {
    this.timeline
      .to(this.bar, 0, {alpha: 0})
      .to(this.output, 1, {alpha: 0, onComplete: () => window.cancelAnimationFrame(rafId)})
      .to(this.container, 1.5, {
        css: {
          width: 900,
          height: 500
        },
        ease: window.Power2.easeOut
      }, '-=1')
      .to(this.laodingText, 0.66, {alpha: 0, y: -25}, '-=0.5')
      .to(this.loadedText, 2, {
        alpha: 1,
        y: 0
      }, '-=0.7')
      .to(this.loadedText, 1, {
        alpha: 0,
        y: -25
      })
      .add(this.cover.fadeOut(false), '-=0.66')
      .addCallback(() => this.onAnimationEnd())
      .timeScale(1)
  }

  onAnimationEnd () {
    // this.props.history.push('/projects')
    this.props.loaded()
  }

  render (props = this.props) {
    const ratio = this.props.loader.imagesLoaded.length / 5
    return (
      <div className='center-parent'>
        <div className='loader-text__container'>
          <div ref={e => { this.container = e }} className='loader__animation-container'>
            <p ref={e => { this.laodingText = e }} className='loader-text'>Loading projects in progress...</p>
            <p ref={e => { this.loadedText = e }} className='loader-text loader-text__loaded'>achaufaille</p>
            <Cover
              ref={e => { this.cover = e }}
              src={loaderBg}
              visible
              fullmode />
            <Motion defaultStyle={{width: 0}} style={{width: spring((this.state.animating ? 0 : 100) * ratio)}} onRest={e => ratio === 1 && this.endAnimation()}>
              {({width}) => <div style={{width: `${100 - width}%`}} ref={p => { this.bar = p }} className='loader-bar' />}
            </Motion>
          </div>
        </div>
        <video
          style={{display: 'none'}}
          ref={e => { this.video = e }}
          height={height * 2} width={width}
          muted
          loop>
          <source src='/03-TALL.webm' />
          <source src='/03-TALL.mp4' />
        </video>
        <canvas className='loader-video' ref={e => {
          this.output = e
        }} height={height} width={width} />
        <canvas ref={e => { this.buffer = e }} style={{display: 'none'}} height={height * 2} width={width} />
      </div>
    )
  }
}

export default connectLoader(Loader)
