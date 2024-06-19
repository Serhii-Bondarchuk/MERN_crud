import React from 'react'
import './InputValue.css'

function InputValue({ value, name, setName,
  handleChange
}) {
  return (
    <div className="input-value">
      <label htmlFor={name}>
        {name.toUpperCase()}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={name}
        value={value}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleChange}
      />
    </div>
  )
}

export default InputValue