import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import projectsReducer from './projects/reducer'
import loaderReducer from './loader/reducer'
import cursorReducer from './cursor/reducer'

import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store

const reducers = combineReducers({
  projects: projectsReducer,
  loader: loaderReducer,
  cursor: cursorReducer
})

let store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)
// then run the saga
sagaMiddleware.run(mySaga)

export default Component => {
  return props => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  )
}
