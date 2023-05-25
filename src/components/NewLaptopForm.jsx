import React, {useState} from 'react'
import Button from './Button'
import '../styles/NewLaptopForm.css'

const NewLaptopForm = ({setAddNewLaptop,products,setProducts}) => {

  const [producer,setProducer] = useState('')
  const [screenSize,setScreenSize] = useState('')
  const [resolution,setResolution] = useState('')
  const [screenType,setScreenType] = useState('')
  const [screenTouch,setScreenTouch] = useState('')
  const [processor,setProcessor] = useState('')
  const [processorCors,setProcessorCors] = useState('')
  const [processorClockSpeed,setProcessorClockSpeed] = useState('')
  const [ram,setRAM] = useState('')
  const [discStorage,setDiscStorage] = useState('')
  const [discType,setDiscType] = useState('')
  const [graphicCard,setGraphicCard] = useState('')
  const [graphicCardMemory,setGraphicCardMemory] = useState('')
  const [os,setOs] = useState('')
  const [discReader,setDiscReader] = useState('')

  const [saving,setSaving] = useState(false)
  const [message,setMessage] = useState('')


  const addLaptop = () => {
    setMessage('')
    setSaving(true)
    console.log('addLaptop',producer)
    fetch('http://localhost:5001/api/laptops/create',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({laptop:{producer,screenSize,resolution,screenType,screenTouch,processor,processorCors,processorClockSpeed,ram,discStorage,
        discType,graphicCard,graphicCardMemory,os,discReader}})
    }).then(res => res.json())
    .then(res => {
      console.log(res)
      if(res.message === 'Zapisano'){
        setProducts([[producer,screenSize,resolution,screenType,screenTouch,processor,processorCors,processorClockSpeed,ram,discStorage,
          discType,graphicCard,graphicCardMemory,os,discReader],...products])
      }

      setMessage(res.message)
    })
    .catch(err => console.log(err))
    .finally(() => {setSaving(false);console.log('finally')})
  }

  return (
    <div className='popup'>
      <div className='content'>
        <h3>Dodaj nowy laptop</h3>
        <section className='inputs'>
          <label>
            Producent
            <input type='text' value={producer} onChange={e => setProducer(e.target.value)}/>
          </label>
          <label>
            Przekątna ekranu
            <input type='text' value={screenSize} onChange={e => setScreenSize(e.target.value)}/>
          </label>
          <label>
            Rozdzielczość ekranu
            <input type='text' value={resolution} onChange={e => setResolution(e.target.value)}/>
          </label>
          <label>
            Powierzchnia ekranu
            <input type='text' value={screenType} onChange={e => setScreenType(e.target.value)}/>
          </label>
          <label>
            Dotykowy
            <input type='text' value={screenTouch} onChange={e => setScreenTouch(e.target.value)}/>
          </label>
          <label>
            Procesor
            <input type='text' value={processor} onChange={e => setProcessor(e.target.value)}/>
          </label>
          <label>
            Rdzenie
            <input type='text' value={processorCors} onChange={e => setProcessorCors(e.target.value)}/>
          </label>
          <label>
            Taktowanie [MHz]
            <input type='text' value={processorClockSpeed} onChange={e => setProcessorClockSpeed(e.target.value)}/>
          </label>
          <label>
            RAM
            <input type='text' value={ram} onChange={e => setRAM(e.target.value)}/>
          </label>
          <label>
            Pojemność dysku
            <input type='text' value={discStorage} onChange={e => setDiscStorage(e.target.value)}/>
          </label>
          <label>
            Rodzaj dysku
            <input type='text' value={discType} onChange={e => setDiscType(e.target.value)}/>
          </label>
          <label>
            Układ graficzny
            <input type='text' value={graphicCard} onChange={e => setGraphicCard(e.target.value)}/>
          </label>
          <label>
            Pamięć
            <input type='text' value={graphicCardMemory} onChange={e => setGraphicCardMemory(e.target.value)}/>
          </label>
          <label>
            System
            <input type='text' value={os} onChange={e => setOs(e.target.value)}/>
          </label>
          <label>
            Napęd
            <input type='text' value={discReader} onChange={e => setDiscReader(e.target.value)}/>
          </label>
        </section>
        <section className='buttons'>
          <Button text='Anuluj' handler={() => setAddNewLaptop(false)}/>
          <Button text={'Zapisz'} handler={addLaptop}/>
        </section>
        <p>{saving ? 'Zapisywanie..' : message}</p>
      </div>
    </div>
  )
}

export default NewLaptopForm