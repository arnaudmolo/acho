import { connect } from 'react-redux'
import * as actions from './actions'

const mapStateToProps = (state, ownProps) => {
  return {
    cursor: state.cursor
  }
}

export default connect(mapStateToProps, actions)

export const onlyActions = connect(null, actions, null, {
  withRef: true
})
