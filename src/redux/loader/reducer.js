import { LOAD_IMAGE } from './actions'

const loadElements = (state = {
  imagesLoaded: []
}, action) => {
  if (LOAD_IMAGE === action.type) {
    return {
      ...state,
      imagesLoaded: [...state.imagesLoaded, action.url]
    }
  }
  return state
}

export default loadElements
