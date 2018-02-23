import { combineReducers } from 'redux'
import undoable from 'redux-undo';
import {
  SET_BROWSER_ONLINE
} from './actions'

const initialOnlineState = {
  browser: navigator && navigator.onLine ? navigator.onLine : true,
  timestamp: Date.now(),
  first: Date.now()
}

function online (state = initialOnlineState, action) {
  switch (action.type) {
    case SET_BROWSER_ONLINE:
      return { ...state, browser: action.browserOnline, timestamp: action.timestamp }
    default:
      return state
  }
}

const onlineApp = combineReducers({
  online: undoable(online)
})

export default onlineApp
