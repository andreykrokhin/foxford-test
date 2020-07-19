import React from 'react'
import classes from './Layout.module.scss'
import Container from '../Container/Container'
import Header from '../../components/Header/Header'

export default (props) => {
  return (
    <div className={classes.Layout}>
      <div className={classes.HeaderWrapper}>
        <Container>
          <Header />
        </Container>
      </div>
      <main>
        { props.children }
      </main>
    </div>
  )
}
