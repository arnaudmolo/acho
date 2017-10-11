import { REQUEST, SUCCESS, NEXT } from './actions'

export default (state = {
  projects: []
}, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        projects: action.projects
      }
    case REQUEST:
      return state
    case NEXT:
      return {
        projects: [...state.projects.slice(1), state.projects[0]]
      }
    default:
      return state
  }
}
