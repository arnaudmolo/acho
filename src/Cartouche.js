import React from 'react'
import cx from 'classnames'
import './Cartouche.css'

const Cartouche = props =>
  props.data.length >= 1 ? <div className={cx('cartouche--container', props.className)}>
    <h6 className='cartouche--title'>{props.title}</h6>
    <p className='cartouche--text'>{
      props.data.map((item, index) =>
        <span className={cx({'cartouche--text__break': props.break})} key={item}>{item}{index !== props.data.length - 1 && ', '}</span>
      )}
    </p>
  </div> : null

export default Cartouche
