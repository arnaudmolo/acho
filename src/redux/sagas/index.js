import { put, takeLatest, call, take } from 'redux-saga/effects'
import Prismic from 'prismic-javascript'
import PrismicConfig from './prismic-configuration'
import { loadImages as loadImagesChannel } from '../loader/saga'
import { loadImage } from '../loader/actions'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function * fetchProjects (Api, action) {
  try {
    const projects = yield Api.query(
      Prismic.Predicates.at('document.type', 'project')
    )
    yield put({type: 'FETCH_PROJECTS_SUCCEEDED', projects: projects.results})
  } catch (e) {
    yield put({type: 'FETCH_PROJECTS_FAILED', message: e.message})
  }
}

function * createApi () {
  return yield Prismic.api(PrismicConfig.apiEndpoint, { PrismicConfig })
}

function * loadImages (action) {
  const chan = yield call(loadImagesChannel, action)
  try {
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      let image = yield take(chan)
      yield put(loadImage(image))
    }
  } finally {
    console.log('countdown terminated')
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If 'USER_FETCH_REQUESTED' gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function * mySaga () {
  const Api = yield createApi()
  yield takeLatest('FETCH_PROJECTS_REQUESTED', fetchProjects, Api)
  yield takeLatest('FETCH_PROJECTS_SUCCEEDED', loadImages)
  yield put({type: 'FETCH_PROJECTS_REQUESTED'})
}

export default mySaga
