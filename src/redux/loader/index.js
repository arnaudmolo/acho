import { connect } from 'react-redux'
import { loaded } from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    loader: state.loader
  }
}

export default connect(mapStateToProps, { loaded })
