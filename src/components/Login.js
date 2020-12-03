import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import LoadingSpinner from './UIElements/LoadingSpinner'
import { Context } from '../Context'
import './login.css'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { logMeIn, IdHandler } = useContext(Context)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  let history = useHistory()

  let userId, first_name, last_name, token

  const loginUser = async (e) => {
    e.preventDefault()
    let response

    try {
      setError(null)
      setIsLoading(true)
      response = await fetch('http://localhost:4001/sm/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          userId,
          first_name,
          last_name,
          token,
        }),
      })
      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message)
      }
      console.log(responseData)
      if (!response.ok) {
        console.log('did not work line 24')
      } else {
        logMeIn(responseData)
        setIsLoading(false)
        history.push('/profile')
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      setError(err.message || 'Something fucked up. get back on that horse')
    }
  }

  return (
    <div className='login_component'>
      {isLoading ? <LoadingSpinner asOverlay /> : null}

      <form onSubmit={loginUser}>
        <label>
          Email:
          <input
            type='text'
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type='password'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button>Log In</button>
        <br />
        <div className='errorMessage'>{error ? `${error}` : null}</div>
      </form>
    </div>
  )
}

export default Login
