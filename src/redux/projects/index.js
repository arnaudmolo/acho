import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    projects: state.projects.projects
  }
}

export default connect(mapStateToProps)
