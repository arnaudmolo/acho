import { connect } from 'react-redux'
import { next } from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    projects: state.projects.projects
  }
}

export default connect(mapStateToProps, { next })
