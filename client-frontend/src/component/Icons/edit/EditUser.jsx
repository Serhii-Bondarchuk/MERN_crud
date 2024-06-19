import React from 'react'
import edit from '../../../assets/edit.png'
import { Link } from 'react-router-dom'
import './EditUser.css'

function EditUser({ id, uniqueUserEmails }) {

  return (

    <div className='edit' >
      <Link to={`/update/${id}`} state={uniqueUserEmails}>
        <img width="20" height="20" alt='edit button' src={edit}></img>
      </Link>
    </div>
  )
}

export default EditUser