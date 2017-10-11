import React from 'react'
import {Motion, spring} from 'react-motion'
import GSComponent from './GSComponent'
import connectLoader from './redux/loader'
import './Loader.css'

// import CustomEase from 'gsap/CustomEase'

class Loader extends GSComponent {
  componentDidMount () {
    this.timeline.to(this.container, 1, {
      css: {
        x: 0
      },
      delay: 1,
      ease: window.Power2.easeOut
    })
    // .to(this.bar, 1, {
    //   css: {
    //     x: 15
    //   },
    //   delay: 1
    // })
  }

  // componentDidUpdate (prevProps, prevState) {
  //   this.timeline.to(this.bar, 1, {
  //     css: {
  //       x: 276 / 6 * this.props.loader.imagesLoaded.length
  //     },
  //     onComplete: () => {
  //       if (this.props.loader.imagesLoaded.length === 6) {
  //         this.endAnimation()
  //       }
  //     }
  //   })
  // }

  endAnimation () {
    this.timeline
      .to(this.bar, 0, {alpha: 0})
      .to(this.container, 1.5, {
        css: {
          width: 605,
          height: 280
        },
        ease: window.Power2.easeOut
      })
      .to(this.laodingText, 0.66, {alpha: 0, y: -25}, '-=0.5')
      .to(this.loadedText, 2, {
        alpha: 1,
        y: 0,
        onComplete: () => this.onAnimationEnd()
      }, '-=0.7')
  }

  onAnimationEnd () {
    this.props.history.push('/projects')
  }

  render (props = this.props) {
    const ratio = this.props.loader.imagesLoaded.length / 6
    console.log(ratio)
    return (
      <div className='center-parent'>
        <div className='loader-text__container'>
          <div ref={e => { this.container = e }} className='loader__animation-container'>
            <p ref={e => { this.laodingText = e }} className='loader-text'>Loading projects in progress...</p>
            <p ref={e => { this.loadedText = e }} className='loader-text loader-text__loaded'>achaufaille</p>
            <Motion defaultStyle={{width: 100}} style={{width: spring(100 * ratio)}} onRest={e => ratio === 1 && this.endAnimation()}>
              {({width}) => <div style={{width: `${100 - width}%`}} ref={p => { this.bar = p }} className='loader-bar' />}
            </Motion>
          </div>
        </div>
      </div>
    )
  }
}

export default connectLoader(Loader)
