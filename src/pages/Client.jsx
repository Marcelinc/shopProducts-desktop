import React from 'react'
import Button from '../components/Button'
import '../styles/Client.css'

const Client = () => {

  const getLaptopList = () => {
    console.log('getlist')
  }

  return (
    <div className='container'>
      <section className='buttonsClient'>
        <div id='matrixBttn'>
          <h5 className='desc'>Wybór producenta</h5>
          <select className='btn clientSelect'>
            <option>producent1</option>
            <option>producent2</option>
          </select>
          <Button text='Liczba laptopów producenta' handler={getLaptopList}/>
          <p id='laptopCount'>Liczba laptopów</p>
        </div>
        <div id='producerBttn'>
          <h5 className='desc'>Wybór matrycy</h5>
          <select className='btn clientSelect'>
            <option>matryca1</option>
            <option>matryca2</option>
          </select>
          <Button text='Lista laptopów z określoną matrycą' handler={getLaptopList}/>
        </div>
      </section>
    </div>
  )
}

export default Client