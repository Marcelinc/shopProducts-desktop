import React, {useState} from 'react'
import Button from './Button'
import '../styles/NewLaptopForm.css'

const NewLaptopForm = ({setAddNewLaptop}) => {

  const [producer,setProducer] = useState('')
  const [screenSize,setScreenSize] = useState('')
  const [resoluion,setResolution] = useState('')
  const [screenType,setScreenType] = useState('')


  const addLaptop = () => {

  }

  return (
    <div className='popup'>
      <div className='content'>
        <h3>Add new laptop</h3>
        <section className='inputs'>
          <label>
            Producent
            <input type='text' value={producer} onChange={e => setProducer(e.target.value)}/>
          </label>
          <label>
            Przekątna ekranu
            <input type='text' value={producer} onChange={e => setScreenSize(e.target.value)}/>
          </label>
          <label>
            Rozdzielczość ekranu
            <input type='text' value={producer} onChange={e => setResolution(e.target.value)}/>
          </label>
        </section>
        <section className='buttons'>
          <Button text='Anuluj' handler={() => setAddNewLaptop(false)}/>
          <Button text='Dodaj' handler={addLaptop}/>
        </section>
      </div>
    </div>
  )
}

export default NewLaptopForm