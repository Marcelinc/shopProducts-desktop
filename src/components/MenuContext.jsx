import React, { useEffect, useState } from 'react'
import ContextItem from './ContextItem'
import '../styles/ContextMenu.css'

const MenuContext = ({top,left, productArraysId,products,setProducts}) => {

  const deleteLaptop = () => {
    console.log('delete')
    const product = products[productArraysId]
    let updatedProducts = products
    if(product.includes('DB')){
      //make request to delete
      fetch(`http://localhost:5001/api/laptops/delete/${product[15]}`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => response.json())
      .then(response => {
      console.log(response)
      if(response.message !== 'Problem with deleting'){
        //delete from productArray
        console.log(updatedProducts)
        setProducts(updatedProducts.filter((element,index) => index !== parseInt(productArraysId )))
      }
      }).catch(err => console.log(err))
    } else{ //row is not from db
      console.log(updatedProducts)
      setProducts(updatedProducts.filter((element,index) => index !== parseInt(productArraysId )))
    }
    
  }

  return (
    <div className='contextContainer' style={{top,left, position:'absolute'}}>
        <ContextItem content='Usuń' handler={deleteLaptop}/>
    </div>
  )
}

export default MenuContext