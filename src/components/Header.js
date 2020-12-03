import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Context } from '../Context'
import './header.css'

const Header = (props) => {
  const { token, userId, logOutHandler } = useContext(Context)

  return (
    <div>
      <nav>
        {token && (
          <ul>
            <li>
              <NavLink to={`/${userId}`} exact>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to={`/profile/${userId}`}>Profile</NavLink>
            </li>
            <li className='login'>
              <NavLink onClick={logOutHandler} to={'/login'}>
                LogOut
              </NavLink>
            </li>
          </ul>
        )}
        {!token && (
          <ul>
            <li>
              <a href='/friends'>Friends</a>
            </li>
            <li>
              <a href='#'>Hard</a>
            </li>

            <li className='login'>
              <a href='/register'>Register</a>
            </li>
            <li className='login'>
              <a href='/login'>Login</a>
            </li>
          </ul>
        )}
      </nav>
    </div>
  )
}

export default Header
