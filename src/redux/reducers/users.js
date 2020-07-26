import { FETCH_USERS, SHOW_LOADER, HIDE_LOADER, MARK_USERS } from "../actions/actionTypes"

const initalState = {
  isLoading: false,
  users: [],
  markedUsersIds: []
}

export default function rootReducer(state = initalState, action) {

  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, isLoading: true }
      
    case HIDE_LOADER:
      return { ...state, isLoading: false }

    case FETCH_USERS:
      return { ...state, users: action.payload }

    case MARK_USERS:
      // Если marked = true - добавляем к текущему массиву массив выбранных сотрудников, иначе фильтруем текущий массив от выбранных сотрудников. Используем Set для избежания дубликатов
      const markedUsersIds = action.payload.marked
        ? [...new Set([...state.markedUsersIds.concat(action.payload.usersIds)])]
        : state.markedUsersIds.filter(id => !action.payload.usersIds.includes(id))

      return { ...state, markedUsersIds }
  
    default:
      return state
  }
}