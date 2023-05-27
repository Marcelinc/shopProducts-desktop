import React from 'react'

const ContextItem = ({content,handler}) => {
  return (
    <div className='contextItem' onClick={handler}>{content}</div>
  )
}

export default ContextItem