import moment from 'moment'
import { dtFormat } from './config'

// ACTION TYPES

export const SET_BROWSER_ONLINE = 'SET_BROWSER_ONLINE'
// export const CLEAR_ONLINE_HISTORY = 'CLEAR_ONLINE_HISTORY'

// OTHER CONSTANTS

// ACTION CREATORS

export function setBrowserOnline (browserOnline = true) {
  let timestamp = Date.now()

  let speechText = `Detected network changed to ${browserOnline ? 'on line' : 'off line'}`
  let notificationText = `Network ${ browserOnline ? 'online' : 'offline'} as of ${moment(timestamp).format(dtFormat)}`

  var speechMessage = new SpeechSynthesisUtterance(speechText)
  window.speechSynthesis.speak(speechMessage)

  if (!('Notification' in window)) {
    // This browser does not support desktop notification, do nothing
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    var notification = new Notification(notificationText)
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        var notification = new Notification(notificationText)
      }
    })
  }

  return { type: SET_BROWSER_ONLINE, browserOnline, timestamp}
}

// export function clearOnlineHistory () {
//   return { type: CLEAR_ONLINE_HISTORY }
// }
