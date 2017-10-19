import { REQUEST, SUCCESS, NEXT, PREV, GO_TO } from './actions'

export default (state = {
  projects: [],
  selected: 3
}, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        projects: action.projects
      }
    case REQUEST:
      return state
    case GO_TO:
      return {
        ...state,
        selected: action.payload
      }
    case PREV:
      if (state.selected === 0) {
        return {
          ...state,
          selected: state.projects.length - 1
        }
      }
      return {
        ...state,
        selected: state.selected - 1
      }
    case NEXT:
      if (state.selected === state.projects.length - 1) {
        return {
          ...state,
          selected: 0
        }
      }
      return {
        ...state,
        selected: state.selected + 1
      }
    default:
      return state
  }
}
