import { FETCH_USERS, SHOW_LOADER, HIDE_LOADER, MARK_USERS } from "./actionTypes"
import faker from 'faker'
faker.locale = 'ru'

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
      const response = Array(300).fill(0).map(item => { return {id: faker.random.uuid(), firstname: faker.name.firstName(), lastname: faker.name.lastName(), age: 20 + faker.random.number(20)} })
      dispatch({ type: FETCH_USERS, payload: response })
      dispatch({ type: HIDE_LOADER })
    }, 1000);
  }
}

export function markUsers(usersIds, marked = true) {
  return {
    type: MARK_USERS,
    payload: { usersIds, marked }
  }
}