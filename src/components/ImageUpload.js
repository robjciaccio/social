import React, { useRef, useState, useEffect, useContext } from 'react'
import { Context } from '../Context'

import './imageUpload.css'

const ImageUpload = (props) => {
  const [file, setFile] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState(false)
  const { setImage } = useContext(Context)

  const filePickerRef = useRef()

  useEffect(() => {
    if (!file) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  const pickedHandler = (event) => {
    let pickedFile
    let fileIsValid = isValid
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0]
      setFile(pickedFile)
      setIsValid(true)
      fileIsValid = true
    } else {
      setIsValid(false)
      fileIsValid = false
    }
    setImage(file)
  }

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }

  return (
    <div className='form-control'>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>
          {previewUrl && <img src={previewUrl} alt='Preview' />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <button type='button' onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  )
}

export default ImageUpload
