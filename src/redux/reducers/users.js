import { FETCH_USERS, SHOW_LOADER, HIDE_LOADER } from "../actions/actionTypes"

const initalState = {
  isLoading: false,
  users: []
}

export default function rootReducer(state = initalState, action) {

  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, isLoading: true }
      
    case HIDE_LOADER:
      return { ...state, isLoading: false }

    case FETCH_USERS:
      return { ...state, users: action.payload }
  
    default:
      return state
  }
}