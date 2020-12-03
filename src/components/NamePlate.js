import React, { useState, useEffect, useContext } from 'react'
import './namePlate.css'

const NamePlate = ({ first_name, last_name }) => {
  return (
    <div>
      <h1 className='namePlate'>{`${first_name} ${last_name}`}</h1>
    </div>
  )
}

export default NamePlate
