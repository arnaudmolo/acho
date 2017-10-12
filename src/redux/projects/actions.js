export const SUCCESS = 'FETCH_PROJECTS_SUCCEEDED'
export const REQUEST = 'FETCH_PROJECTS_REQUESTED'
export const FAILED = 'FETCH_PROJECTS_FAILED'
export const NEXT = 'NEXT_PROJECTS'
export const GO_TO = 'GO_TO'

export const next = () => ({type: NEXT})
export const goTo = (to) => ({type: GO_TO, payload: to})
