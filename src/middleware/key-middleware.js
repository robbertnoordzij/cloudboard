import { press, release } from '../actions/key-actions'
import { queue } from '../actions/sound-actions'

export default function createKeyMiddleware(document) {
  return ({ dispatch, getState }) => {
    document.addEventListener('keydown', e => {
      if (onBoard(getState())) {
        dispatch(press(e.key))
      }
    })

    document.addEventListener('keyup', e => {
      if (onBoard(getState())) {
        dispatch(release(e.key))
      }
    })

    return next => action => {
      next(action) // eslint-disable-line callback-return

      if (action.type === 'PRESS') {
        handleKeyCombinations(getState(), dispatch)
      }
    }
  }
}

function onBoard({ routing }) {
  return routing.locationBeforeTransitions.pathname !== '/'
}

function handleKeyCombinations({ keys, sounds, routing }, dispatch) {
  if (keys.length !== 2) {
    return
  }

  const [collectionKey, soundKey] = keys

  const matchingSound = sounds.find(sound =>
    sound.collectionKey === collectionKey &&
    sound.key === soundKey
  )

  if (matchingSound) {
    dispatch(queue(matchingSound.name, matchingSound.collection))
  }
}