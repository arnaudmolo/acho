import { LOAD_IMAGE, LOADED } from './actions'

const loadElements = (state = {
  imagesLoaded: [],
  loader: true
}, action) => {
  switch (action.type) {
    case LOADED:
      return {
        ...state,
        loader: false
      }
    case LOAD_IMAGE:
      return {
        ...state,
        imagesLoaded: [...state.imagesLoaded, action.url]
      }
    default:
      return state
  }
}

export default loadElements
