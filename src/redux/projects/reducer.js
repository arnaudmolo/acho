import { REQUEST, SUCCESS, NEXT } from './actions'

export default (state = {
  projects: [],
  selected: 2
}, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        projects: action.projects
      }
    case REQUEST:
      return state
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
