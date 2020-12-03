import React, { useContext, useState, useEffect } from 'react'
import Form from '../components/Form'
import Posts from '../components/Posts'
import { Context } from '../Context'

const Home = (props) => {
  const [posts, setPosts] = useState([])
  const { token } = useContext(Context)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4001/sm/users/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const responseData = await response.json()
        setPosts(responseData.posts)
      } catch (err) {}
    }
    fetchPosts()
  }, [])

  return (
    <div>
      <Form />
      <Posts posts={posts} />
    </div>
  )
}

export default Home
