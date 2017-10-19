import { connect } from 'react-redux'
import { next, goTo, prev } from './actions'
import { createSelector } from 'reselect'

const isNotEmpty = array => array.length >= 1
const cleanApi = (key, at, check) => array => {
  try {
    return check(array[0][key]) ? array.map(sub => sub[key][0][at]) : []
  } catch (e) {
    return []
  }
}
const cleanGallery = obj => obj.map(e => e.image_gallery.url)
const error = 'A mettre dans le backend'

export const toSimpleProject = project => ({
  title: project.data.title[0].text,
  description_title: project.data.description_title[0] ? project.data.description_title[0].text : error,
  cover: project.data.cover.url,
  year: new Date(project.data.year).getFullYear(),
  services: cleanApi('service', 'text', isNotEmpty)(project.data.services),
  delivrables: cleanApi('delivrable', 'text', isNotEmpty)(project.data.delivrables),
  team: cleanApi('team_member', 'text', isNotEmpty)(project.data.team_members),
  description: project.data.description.map(e => e.text),
  gallery: cleanGallery(project.data.gallery)
})

const blockAtCreator = n => {
  return x => {
    if (x > n - 1) {
      return x - n
    }
    if (x < 0) {
      return n - x
    }
    return x
  }
}

const moveArrayOrder = createSelector(
  state => state.projects,
  state => state.selected,
  (projects, offset) => {
    const blockAt = blockAtCreator(projects.length)
    return projects.reduce((previous, current, index) => {
      previous[blockAt(index + 1 + offset)] = current
      return previous
    }, [])
  }
)

const mapStateToProps = (state, ownProps) => {
  state = state.projects
  if (state.projects.length === 0) {
    return state
  }
  return {
    projects: moveArrayOrder(state, ownProps),
    selected: state.selected
  }
}

export default connect(mapStateToProps, { next, goTo, prev }, null, { withRef: true })

export const oneProject = connect((state, ownProps) => {
  const project = state.projects.projects.find(
    project => project.uid === ownProps.match.params.uid
  )
  const nextIndex = blockAtCreator(
    state.projects.projects.length
  )(
    state.projects.projects.indexOf(project) + 1
  )
  const nextProject = state.projects.projects[nextIndex]
  return {
    project,
    nextProject
  }
})
