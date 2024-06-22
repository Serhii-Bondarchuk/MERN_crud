import React, { useContext, useEffect, useState } from 'react'
import InputValue from '../input/InputValue'
import { Button } from 'ui_lib_storybook'
import axios from 'axios'
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import './AddUser.css'
import Error from '../error/Error';
import { UrlContext } from '../../App'



function AddUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [validationError, setValidationError] = useState(false)
  const urlDeploy = useContext(UrlContext)

  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newUser = {
      name,
      email,
      address
    }

    try {
      const response = await axios.post(`${urlDeploy}/api/create`, newUser)
      toast.success(`User ${response.data.name} added successfully!`)
      navigate('/')
    } catch (e) {
      toast.error(`${e.response.data.msg}`)
    }
    setName('')
    setEmail('')
    setAddress('')
  }

  useEffect(() => {
    const uniqueEmail = state.find(user => user.email === email)

    if (uniqueEmail) {
      setValidationError(prev => !prev)
    } else {
      setValidationError(false)
    }
  }, [email, state])

  const isValid = () => {
    const uniqueEmail = state.find(user => user.email === email)
    return name && email && address && !uniqueEmail
  }

  return (
    <>
      <Toaster position="top-right"
        reverseOrder={false} />
      <div className='addUser'>
        <h3 className='title'>
          Add new user
        </h3>
        <Link to='/'>
          <Button>Back</Button>
        </Link>
        <form onSubmit={handleSubmit}>
          <InputValue name='name' setName={setName} value={name} />
          <InputValue name='email' setName={setEmail} value={email} />
          {
            validationError &&
            <Error msg='User with this email already exists' />
          }
          <InputValue name='address' setName={setAddress} value={address} />
          <Button style={{ marginTop: '10px' }} disabled={!isValid() || validationError} fullWidth variant='secondary' type="submit" >Add user</Button>
        </form>
      </div>
    </>
  )
}

export default AddUser