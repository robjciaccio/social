import React, { useState, useEffect } from 'react'
import Interaction from './Interaction'
import NamePlate from '../components/NamePlate'
import './Posts.css'
import ProfileCard from './ProfileCard'

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
  }, [posts])

  let mappedPosts
  let foundUser
  const flip = posts.reverse()

  console.log(users)
  console.log(flip)

  mappedPosts = flip.map((post, i) => {
    foundUser = users.find((user) => user._id === post.user_id)

    return (
      <div key={i} className='post_container'>
        <div>
          <ProfileCard
            first_name={foundUser.first_name}
            last_name={foundUser.last_name}
            image={foundUser.image}
          />
        </div>
        <h1 className='post'>{post.content}</h1>

        <Interaction />
      </div>
    )
  })

  return <div>{mappedPosts}</div>
}

export default Posts
