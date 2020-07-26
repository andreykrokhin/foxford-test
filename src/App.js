import React from 'react'
import { connect } from 'react-redux'
import UsersTable from './containers/UsersTable/UsersTable'
import Layout from './hoc/Layout/Layout'
import { Loader } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'

const App = ({ isLoading }) => (
  <Layout>
    { isLoading
      ? <Loader size="lg" center />
      : <UsersTable />
    }
  </Layout>
)

function mapStateToProps(state) {
  return {
    isLoading: state.app.isLoading
  }
}

export default connect(mapStateToProps)(App)
