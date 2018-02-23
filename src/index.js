import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // DEFAULTS TO LOCALSTORAGE FOR WEB AND ASYNCSTORAGE FOR REACT-NATIVE
// import { PersistGate } from 'redux-persist/integration/react'

import onlineApp from './reducers'
// import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

// const persistConfig = {
//   key: 'root',
//   storage,
//   stateReconciler: autoMergeLevel1
// }

// const persistedReducer = persistReducer(persistConfig, onlineApp)

// let store = createStore(
//   persistedReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

let store = createStore(
  onlineApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
