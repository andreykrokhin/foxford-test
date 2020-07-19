import { FETCH_USERS, SHOW_LOADER, HIDE_LOADER } from "./actionTypes"
import { v4 as uuidv4 } from 'uuid'

export function showLoader() {
  return {
    type: SHOW_LOADER
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER
  }
}

export function fetchUsers() {
  return (dispatch) => {
    dispatch({ type: SHOW_LOADER })
    setTimeout(() => {
      const response = [
        {id: 1, firstname: 'Leanne', lastname: 'Graham', age: 25},
        {id: 2, firstname: 'Ervin', lastname: 'Howell', age: 33},
        {id: 3, firstname: 'Clementine', lastname: 'Bauch', age: 28},
      ]
      // const response = Array(300).fill(0).map(item => { return {id: uuidv4(), firstname: 'Leanne', lastname: 'Graham', age: 25} })
      dispatch({ type: FETCH_USERS, payload: response })
      dispatch({ type: HIDE_LOADER })
    }, 1000);
  }
}