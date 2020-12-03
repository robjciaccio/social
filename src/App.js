import React, { useState, useCallback, useContext, useEffect } from 'react'
import Home from './pages/Home'
import Header from './components/Header'
import Profile from './pages/Profile'
import Friends from './pages/Friends'
import Register from './pages/Register'
import Login from './components/Login'

import { Context } from './Context'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'

const App = () => {
  const { token, userId } = useContext(Context)

  let routes

  if (token) {
    routes = (
      <Switch>
        <Route exact path={`/${userId}`}>
          <Home />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/friends'>
          <Friends />
        </Route>
      </Switch>
    )
  } else if (!token) {
    routes = (
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </Switch>
    )
  }
  return (
    <Router>
      <Header />
      {routes}
    </Router>
  )
}

export default App
