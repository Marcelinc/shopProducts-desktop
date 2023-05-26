import React from 'react'

const ContextItem = ({content}) => {

  const deleteLaptop = () => {
    console.log('delete')
    fetch('http://localhost:5001/api/laptops/delete/1',{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }
    
  return (
    <div className='contextItem' onClick={deleteLaptop}>{content}</div>
  )
}

export default ContextItem