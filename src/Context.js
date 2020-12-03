import React, { useEffect, useState } from 'react'

const Context = React.createContext()

const ContextProvider = ({ children }) => {
  const [text, setText] = useState('')
  const [posts, setPosts] = useState([])
  const [token, setToken] = useState(null)
  const [error, setError] = useState('')
  const [userId, setUserId] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [image, setImage] = useState('')

  const handleText = (word) => {
    setText(word)
  }

  const handleSubmit = (post) => {
    setPosts((prevPosts) => [...prevPosts, post])
    setText('')
  }

  const errorHandler = (text) => {
    setError(text)
  }

  const IdHandler = ({ userId }) => {
    setUserId(userId)
    console.log(userId)
  }

  const postsHandler = ({ user_id, content }) => {
    setPosts(content)
  }

  const imageHandler = ({ name }) => {
    setImage(name)
    console.log(image)
  }

  const logMeIn = (responseData) => {
    setUserId(responseData.userId)
    setToken(responseData.token)
    setPosts(responseData.posts)
    setFirst_name(responseData.first_name)
    setLast_name(responseData.last_name)
    localStorage.setItem('userData', JSON.stringify({ responseData }))
  }

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('userData'))

    if (loggedInUser) {
      logMeIn(loggedInUser.responseData)
    }
  }, [])

  const logOutHandler = () => {
    setUserId(null)
    setToken(null)
    localStorage.clear()
  }

  return (
    <Context.Provider
      value={{
        handleText,
        text,
        handleSubmit,
        posts,
        token,
        logMeIn,
        error,
        userId,
        IdHandler,
        logOutHandler,
        first_name,
        last_name,
        image,
        setImage,
        imageHandler,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
