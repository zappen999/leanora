import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { app } from './reducers'
import { StoreState } from './types'
import './index.css'

const store = createStore<StoreState>(app, {
  title: 'test',
  language: 'se'
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
