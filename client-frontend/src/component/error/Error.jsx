import React from 'react'
import styles from './Error.module.css'
function Error({ msg }) {
  return (
    <div className={styles.error}>{msg}</div>
  )
}

export default Error