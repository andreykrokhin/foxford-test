import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from './redux/actions/actions'
import UsersTable from './containers/UsersTable/UsersTable'
import Layout from './hoc/Layout/Layout'
import { Loader } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'

const App = ({ isLoading, users, fetchUsers }) => {
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <Layout>
      { isLoading
        ? <Loader size="lg" center />
        : <UsersTable users={users} />
      }
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.app.isLoading,
    users: state.app.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
