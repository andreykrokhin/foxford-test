import React from 'react'
import classes from './Header.module.scss'

export default () => (
  <header className={classes.Header}>
    <div className={classes.Logo} />
    <p className={classes.PageTitle}>Список сотрудников</p>
  </header>
)