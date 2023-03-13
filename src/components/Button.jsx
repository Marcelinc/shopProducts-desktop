import React from 'react'
import '../styles/Button.css'

const Button = ({text,handler}) => {
  return (
    <div className='btn' onClick={handler}>{text}</div>
  )
}

export default Button