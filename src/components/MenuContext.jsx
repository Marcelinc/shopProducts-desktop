import React, { useEffect, useState } from 'react'
import ContextItem from './ContextItem'
import '../styles/ContextMenu.css'

const MenuContext = ({top,left}) => {

  return (
    <div className='contextContainer' style={{top,left, position:'absolute'}}>
        <ContextItem content='Usuń'/>
    </div>
  )
}

export default MenuContext