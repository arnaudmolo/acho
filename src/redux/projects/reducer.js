import { REQUEST, SUCCESS } from './actions'

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
    default:
      return state
  }
}
