import React from 'react'
import trash from '../../../assets/del.png'
import './DeleteUser.css'

function DeleteUser({ id, toast, deleteUser }) {
  return (
    <div
      className='deleteButton'
      onClick={() => deleteUser(id)}
    ><img width="20" height="20" alt='delete button' src={trash}></img></div>
  )
}

export default DeleteUser