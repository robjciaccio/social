import React, { useState, useEffect } from 'react'

const Friends = (props) => {
  const [users, setUsers] = useState([])
  const friendsAPI = 'http://localhost:4001/sm/users'

  async function makeGetRequest() {
    const res = await fetch('http://localhost:4001/sm/users')
    const data = await res.json()
    console.log(data.users)
    setUsers(data.users)
  }

  useEffect(() => {
    makeGetRequest()
  }, [])

  return (
    <div>
      {users.map((user, i) => {
        return (
          <div>
            <h1 key={i}>{`${user.first_name}`}</h1>
            <h3>{`${user.posts.content}`}</h3>
          </div>
        )
      })}
    </div>
  )
}

export default Friends
