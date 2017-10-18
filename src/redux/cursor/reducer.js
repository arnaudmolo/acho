import { SHOW_CURSOR, HIDE_CURSOR } from './actions'

const cursorReducer = (state = true, action) => {
  switch (action.type) {
    case SHOW_CURSOR:
      return true
    case HIDE_CURSOR:
      return false
    default:
      return state
  }
}

export default cursorReducer
