import { eventChannel, END } from 'redux-saga'

export function loadImages (action) {
  // for (var i = 0; i < action.projects.length; i++) {
  //   yield fork(loadAndListen, action.projects[i].data)
  // }
  return eventChannel(emitter => {
    let count = 0
    action.projects.forEach(({data}) => {
      const image = new window.Image()
      image.src = data.cover.url
      image.onload = () => {
        emitter(data.cover.url)
        count = count + 1
        if (count === action.projects.length) {
          emitter(END)
        }
      }
    })
    return () => {}
  })
}
