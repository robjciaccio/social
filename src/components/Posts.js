import React, { useState, useEffect } from 'react'
import Interaction from './Interaction'
import NamePlate from '../components/NamePlate'
import './Posts.css'

const Posts = ({ posts }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:4001/sm/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const responseData = await response.json()

      setUsers(responseData)
    }
    fetchUsers()
  }, [])

  let mappedPosts
  const flip = posts.reverse()

  mappedPosts = posts.map((post, i) => {
    const foundUser = users.find((user) => user._id === post.user_id)

    return (
      <div key={i} className='post_container'>
        <div>
          <NamePlate
            first_name={foundUser.first_name}
            last_name={foundUser.last_name}
          />
        </div>
        <h1 className='post'>{post.content}</h1>
        <div className='interaction'>
          <Interaction />
        </div>
      </div>
    )
  })

  return <div>{mappedPosts}</div>
}

export default Posts
