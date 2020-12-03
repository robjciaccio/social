import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../Context'
import Posts from '../components/Posts'
import Form from '../components/Form'

const Profile = (props) => {
  const { userId, first_name } = useContext(Context)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/sm/users/posts/user/${userId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        )
        const responseData = await response.json()
        setPosts(responseData.posts)
      } catch (error) {}
    }
    fetchPosts()
  }, [])

  return (
    <div>
      <Form />
      <h1>{`${first_name}'s Profile`}</h1>
      <Posts posts={posts} />
    </div>
  )
}

export default Profile
