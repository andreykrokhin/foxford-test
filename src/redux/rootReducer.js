import users from './reducers/users'
import { combineReducers } from 'redux'

export default combineReducers({
  app: users
})