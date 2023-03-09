import React from 'react'
import '../styles/Button.css'

const Button = ({text}) => {
  return (
    <div className='btn'>{text}</div>
  )
}

export default Button