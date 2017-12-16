import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

// needs to mock provider for internal compnents...
it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<App />, div)
})
