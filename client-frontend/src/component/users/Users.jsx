import React, { useEffect, useState } from 'react'
import './Users.css'
import { Button } from 'ui_lib_storybook'

import axios from 'axios'
import User from './User'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function UsersTable() {
  const [users, setUsers] = useState([])
  const [uniqueUserEmails, setUniqueUserEmails] = useState([])

  // const urlDeploy = 'https://mern-crud-server-psi.vercel.app'
  const urlDeploy = process.env.REACT_APP_URL_DEPLOY
  console.log(urlDeploy, 'urlDeploy')
  console.log(process.env, 'process.env')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await axios.get('http://localhost:8000/api/users')
        const response = await axios.get(`${urlDeploy}/api/users`)

        setUsers(response.data)
        setUniqueUserEmails(response.data.map((user) => {

          return {
            email: user.email,
            id: user._id
          }
        }
        ))
      } catch (error) {
        toast.error(`${error.response?.data.msg}`)
        setUsers([])
      }
    }

    fetchUsers()
  }, [urlDeploy])

  const deleteUser = async (id) => {
    // const delUrl = `http://localhost:8000/api/delete/${id}`
    const delUrl = `${urlDeploy}/api/delete/${id}`

    try {
      const response = await axios.delete(delUrl)
      toast.success(`User ${response.data.name} deleted successfully!`)
      setUsers(prev => prev.filter(user => user._id !== id))
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  return (
    <>
      <div className="userTable"
        style={{
          display: `${users.length > 0 ? 'block' : 'flex'}`,
          gap: '20%'
        }}
      >
        <Link to='/add' state={uniqueUserEmails}>
          <Button variant='primary'>
            Add user
          </Button>
        </Link>
        {
          users.length > 0 ? <table className='table'>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users?.map((user, index) => {
                  return (
                    <User {...user} index={++index} toast={toast}
                      deleteUser={deleteUser}
                      uniqueUserEmails={uniqueUserEmails}
                      key={user._id}

                    />
                  )
                })
              }
            </tbody>
          </table> :
            <div >

              <h3 className={`${users.length > 0 ? '' : 'title'}`}
                style={{
                  width: '100%',
                }}
              >There are no users yet!</h3>
            </div>
        }
      </div>
    </>
  )
}

export default UsersTable