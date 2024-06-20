import React from 'react'
import EditUser from '../Icons/edit/EditUser'
import DeleteUser from '../Icons/edit/DeleteUser'

function User({
  name,
  email,
  address,
  index,
  _id,
  toast,
  deleteUser,
  uniqueUserEmails
}) {
  return (
    <tr>
      <td data-cell='Number' style={{ textAlign: 'center' }}>{index}</td>
      <td data-cell='Name' >{name}</td>
      <td data-cell='Email'>{email}</td>
      <td data-cell='address'>{address}</td>
      <td>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <EditUser id={_id} toast={toast}
            uniqueUserEmails={uniqueUserEmails}

          />
          <DeleteUser id={_id} toast={toast}
            deleteUser={deleteUser} />
        </div>
      </td>
    </tr>
  )
}

export default User