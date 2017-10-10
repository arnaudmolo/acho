import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    loader: state.loader
  }
}

export default connect(mapStateToProps)
