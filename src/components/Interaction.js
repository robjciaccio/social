import React from 'react'
import './interaction.css'

const Interaction = ({ posts }) => {
  const { likes } = posts
  let totalLikes
  totalLikes = posts.map((post) => {
    return post.likes.length
  })
  return (
    <div>
      <p className='interact'>{`Likes Comment`}</p>
    </div>
  )
}

export default Interaction
