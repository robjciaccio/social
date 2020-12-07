import React, { useContext, useEffect, useState } from 'react'
import './profileCard.css'
import { Context } from '../Context'

const ProfileCard = ({ first_name, last_name, image }) => {
  const newImage = require(`../../${image}`)
  console.log(newImage.default)

  return (
    <div className='card'>
      <div className='info-container'>
        <img
          className='circleImage'
          src={newImage.default}
          alt='profile photo'
        />
        <p className='font-box'>{`${first_name}'s ProfileCard`}</p>
      </div>
    </div>
  )
}

export default ProfileCard

{
  /* <div class='chip'>
      <img src={newImage.default} alt='Person' width='96' height='96' />
      {`${first_name} ${last_name}`}
    </div> */
}
