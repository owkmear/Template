import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom"
import { Routes } from './components/Routes'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  )
}

export default App