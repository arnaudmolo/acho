export const LOAD_IMAGE = 'IMAGE_LOADED'
export const LOADED = 'LOADER_FINISHED'

export const loadImage = (url) => ({
  type: LOAD_IMAGE,
  url
})

export const loaded = () => ({type: LOADED})
