import React, { useCallback, useEffect, useState } from 'react'
import InputValue from '../input/InputValue'
import { Button } from 'ui_lib_storybook'
import axios from 'axios'
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import Error from '../error/Error';

function UpdateUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [validationError, setValidationError] = useState(false)

  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const urlDeploy = process.env.URL_DEPLOY
  const isUniqueEmail = useCallback(() => {
    const userEmails = state.filter(user => user.email === email)

    if (userEmails.length === 1) {
      const isTheSame = userEmails.filter(user => user.id === id)
      return isTheSame.length === 1 ? true : false
    }
    return userEmails.length > 1 ? false : true;
  }, [email, id, state])

  const handleChange = useCallback(() => {
    if (!isUniqueEmail()) {
      setValidationError(true)
    }
    return null
  }, [isUniqueEmail])


  useEffect(() => {
    if (!isUniqueEmail()) {
      setValidationError(true)
    }
    setValidationError(false)
  }, [isUniqueEmail])

  useEffect(() => {
    handleChange()
  }, [handleChange])

  useEffect(() => {
    const getUserById = async () => {
      try {
        // const response = await axios.get(`${urlDeploy}/api/user/${id}`)
        const response = await axios.get(`${urlDeploy}/api/user/${id}`)
        const { name: userName, email: userEmail, address: userAddress } = response.data
        setName(userName)
        setEmail(userEmail)
        setAddress(userAddress)
      } catch (e) {
        toast.error(`${e.response.data.msg}`)
      }
    }
    getUserById(id)
  }, [id, urlDeploy])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newUser = {
      name,
      email,
      address
    }

    try {
      // const response = await axios.put(`http://localhost:8000/api/update/user/${id}`, newUser)
      const response = await axios.put(`${urlDeploy}/api/update/user/${id}`, newUser)
      toast.success(`User ${response.data.name} added successfully!`)
      navigate('/')
    } catch (e) {
      toast.error(`${e.response.data.msg}`)
    }
    setName('')
    setEmail('')
    setAddress('')
  }

  const isValid = () => {
    return name || email || address
  }

  return (
    <>
      <div className='addUser'>
        <h3 className='title'>
          Update user
        </h3>
        <Link to='/'>
          <Button>Back</Button>
        </Link>
        <form onSubmit={handleSubmit}>
          <InputValue name='name' setName={setName} value={name} />
          <InputValue name='email' setName={setEmail} value={email}
            handleChange={handleChange}
          />
          {
            validationError &&
            <Error msg='User with this email already exists' />
          }
          <InputValue name='address' setName={setAddress} value={address} />
          <Button style={{ marginTop: '10px' }} disabled={!isValid() || validationError} fullWidth variant='secondary' type="submit" >Update user</Button>
        </form>
      </div>
    </>
  )
}

export default UpdateUser