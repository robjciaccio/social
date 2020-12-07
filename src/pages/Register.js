import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../Context'
import ImageUpload from '../components/ImageUpload'

const Register = () => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { logMeIn, IdHandler, image, setImage } = useContext(Context)

  let history = useHistory()
  let userId, token

  const fileSelectedHandler = (event) => {
    setImage(event.target.files[0])
  }

  const fileUploadHandler = () => {}

  const createUser = async (e) => {
    e.preventDefault()
    let response

    try {
      let formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      formData.append('first_name', first_name)
      formData.append('last_name', last_name)
      formData.append('image', image)
      setIsLoading(true)

      response = await fetch('http://localhost:4001/sm/users/signup', {
        method: 'POST',
        body: formData,
      })

      const resData = await response.json()
      console.log(formData)
      console.log(resData)
      if (!resData) {
        console.log(resData.message)
      } else {
        console.log(resData)

        logMeIn(resData)
        history.push('/profile')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form onSubmit={(e) => createUser(e)}>
        <label>
          First Name:
          <input
            type='text'
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type='text'
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Image
          <input
            type='file'
            label='image'
            onChange={fileSelectedHandler}
          ></input>
        </label>
        <br />
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register
