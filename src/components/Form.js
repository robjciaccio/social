import React, { useState, useContext, useEffect } from 'react'

import Posts from './Posts'
import { Context } from '../Context'
import './form.css'

const Form = (props) => {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { userId } = useContext(Context)

  const createPost = async (e) => {
    e.preventDefault()
    let response
    try {
      setIsLoading(true)
      response = await fetch('http://localhost:4001/sm/users/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          user_id: userId,
        }),
      })

      const resData = await response.json()
      console.log(resData)
    } catch (err) {
      console.log(err)
    }
  }
  console.log(userId)
  return (
    <div>
      <form onSubmit={(e) => createPost(e)}>
        <label>
          <input
            type='text'
            placeholder='Put stuff Here'
            onChange={(e) => setContent(e.target.value)}
            className='inputfield'
          />
        </label>
      </form>
      <button onClick={(e) => createPost(e)} className={'button'}>
        Post
      </button>
    </div>
  )
}

export default Form
