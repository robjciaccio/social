import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../Context'
import Posts from '../components/Posts'
import Form from '../components/Form'
import ProfileCard from '../components/ProfileCard'
import './profile.css'

const Profile = (props) => {
  const { userId, first_name, last_name, image } = useContext(Context)
  const [posts, setPosts] = useState([])

  console.log(image)

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
        console.log(responseData)
        setPosts(responseData.posts)
      } catch (error) {}
    }
    fetchPosts()
  }, [])

  return (
    <div>
      <div className='profileCard'>
        <ProfileCard
          first_name={first_name}
          last_name={last_name}
          image={image}
        />
      </div>
      <Form />

      <Posts posts={posts} />
    </div>
  )
}

export default Profile
