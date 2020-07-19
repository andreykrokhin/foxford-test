import React from 'react'
import classes from './Container.module.scss'

export default (props) => {
  return (
    <div className={props.className ? classes[props.className] : classes.Container}>
      { props.children }
    </div>
  )
}
