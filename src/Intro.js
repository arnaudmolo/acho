import React, { Component } from 'react'
import './Intro.css'
// import { TweenMax } from 'gsap'

class Intro extends Component {
  componentDidMount () {
    // const blurElement = {
    //   a: 0
    // }
    //
    // const applyBlur = () => {
    //   TweenMax.set(this.texts, {
    //     webkitFilter: 'blur(' + blurElement.a + 'px)',
    //     filter: 'blur(' + blurElement.a + 'px)'})
    // }
    //
    // TweenMax.to(blurElement, 10, {
    //   a: 20, onUpdate: applyBlur
    // })
    //
    // console.log(TweenMax.to(this.texts, '2', {
    //   filter: 'blur(15px)',
    //   delay: 3
    // }))
  }

  render (props = this.props) {
    const intro = 'Hey! I\'m a French designer passionate about image and specialized in web design, identity & interaction design'.split(' ')
    return (
      <div className='center-parent'>
        <div className='intro-text__container'>
          <p ref={p => { this.texts = p }} className='intro-text'>{intro.map(word => <span key={word}>{word} </span>)}</p>
        </div>
      </div>
    )
  }
}

export default Intro
