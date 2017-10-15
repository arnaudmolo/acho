import { connect } from 'react-redux'
import { next, goTo } from './actions'
import { createSelector } from 'reselect'

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
    projects: moveArrayOrder(state, ownProps)
  }
}

export default connect(mapStateToProps, { next, goTo })

export const oneProject = connect((state, ownProps) => {
  return {
    project: state.projects.projects.find(
      project => project.uid === ownProps.match.params.uid
    )
  }
})
