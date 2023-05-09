import React, { useState } from 'react'
import Button from '../components/Button'
import '../styles/Client.css'


const Client = () => {

  const [laptopCount,setLaptopCount] = useState('')
  const [laptopList,setLaptopList] = useState([])
  const [laptopListError,setLaptopListError] = useState(false)
  const [firstCount,setFirstCount] = useState(true)
  const [firstList,setFirstList] = useState(true)

  const [manufacturer,setManufacturer] = useState('Dell')
  const [matrixType,setMatrixType] = useState('matowy')
  const [resolution,setResolution] = useState('1920x1080')
  const [loading,setLoading] = useState(false)
  const [loadingCount,setLoadingCount] = useState(false)

  const getLaptopCountByProducer = async () => {
    setLoading(true)
    setLoadingCount(true)
    setFirstCount(false)
    window.api.send('toMainSoapLaptopCountByProducer',manufacturer)
    window.api.receive('fromMainSoapLaptopCountByProducer', (data) => {
      console.log('data: ',data)
      setLaptopCount(data.name)
      setLoading(false)
      setLoadingCount(false)
      console.log('received')
    })
    console.log('getlist')
  }

  const getLaptopListByMatrixType = async () => {
    setLaptopListError(false)
    setLoading(true)
    setFirstList(false)
    window.api.send('toMainSoapLaptopListByMatrixType',matrixType)
    window.api.receive('fromMainSoapLaptopListByMatrixType', (data) => {
      console.log('data: ',data.name)
      if(!data.name.name){
        setLaptopList([])
        setLaptopListError(true)
      }
      else if(data.name.name.constructor === Object)
        setLaptopList([data.name.name])
      else setLaptopList(data.name.name)
      setLoading(false)
      console.log('received')
    })
    console.log('getlist')
  }

  const getLaptopCountByResolution = async () => {
    setLoading(true)
    setLoadingCount(true)
    setFirstCount(false)
    window.api.send('toMainSoapLaptopCountByResolution',resolution)
    window.api.receive('fromMainSoapLaptopCountByResolution', (data) => {
      console.log('data: ',data)
      setLaptopCount(data.name)
      setLoading(false)
      setLoadingCount(false)
      console.log('received')
    })
    console.log('getlist')
  }

  return (
    <div className='container'>
      <section className='buttonsClient'>
        <div id='matrixBttn'>
          <div className='countBttn'>
            <h5 className='desc'>Wybór producenta</h5>
            <select className='btn clientSelect' value={manufacturer} onChange={e => setManufacturer(e.target.value)}>
              <option value='Dell'>Dell</option>
              <option value='HP'>HP</option>
              <option value='Apple'>Apple</option>
            </select>
            <Button text='Liczba laptopów producenta' handler={getLaptopCountByProducer}/>
            
          </div>
          <div className='countBttn'>
            <h5 className='desc'>Wybór rozdzielczości</h5>
            <select className='btn clientSelect' value={resolution} onChange={e => setResolution(e.target.value)}>
              <option value='1920x1080'>1920x1080</option>
              <option value='1920x1200'>1920x1200</option>
              <option value='2560x1600'>2560x1600</option>
              <option value='1600x800'>1600x900</option>
            </select>
            <Button text='Liczba laptopów o rozdzielczości' handler={getLaptopCountByResolution}/>
          </div>
        </div>
        <p id='laptopCount'>{loadingCount ? '...' : laptopCount === -1 ? 'Błąd' : 'Liczba laptopów ' + laptopCount}</p>
        <div id='producerBttn'>
          <h5 className='desc'>Wybór matrycy</h5>
          <select className='btn clientSelect' value={matrixType} onChange={e => setMatrixType(e.target.value)}>
            <option value='matowy'>matowy</option>
            <option value='błyszczący'>błyszczący</option>
          </select>
          <Button text='Lista laptopów z określoną matrycą' handler={getLaptopListByMatrixType}/>
        </div>
      </section>
      <section className='contentClient'>
        {loadingCount? <p className='fetchInfo'>Wczytywanie...</p> : laptopCount === '-1' ? <p className='fetchInfo'>Błąd podczas wczytywania ilości</p> : 
          firstCount ? '' : <p className='fetchInfo'>Wczytano liczbę laptopów</p>}
        {loading ? <p className='fetchInfo'>Wczytywanie...</p> : laptopListError ? <p className='fetchInfo'>Błąd podczas wczytywania listy</p> : 
          firstList ? '' : <p className='fetchInfo'>Wczytano listę</p>}
        <div>
          <table>
              <thead>
                {laptopList.length > 0 && <tr>
                  <th>Nr.</th>
                  <th>Producent</th>
                  <th>Przekątna ekranu</th>
                  <th>Rozdzielczość ekranu</th>
                  <th>Powierzchnia ekranu</th>
                  <th>Dotykowy</th>
                  <th>Procesor</th>
                  <th>Rdzenie</th>
                  <th>Taktowanie[MHz]</th>
                  <th>RAM</th>
                  <th>Pojemność dysku</th>
                  <th>Rodzaj dysku</th>
                  <th>Układ graficzny</th>
                  <th>Pamięć</th>
                  <th>System</th>
                  <th>Napęd</th>
                </tr>}
              </thead>
              <tbody>
                {laptopList.length > 0 && laptopList.map((product) => <tr key={product.id} id={'row'+product.id}>
                  <td className='col0'>{product.id}</td>
                  <td className='col1'>{product.manufacturer}</td>
                  <td className='col2'>{product['Screen.size']}</td>
                  <td className='col3'>{product['Screen.resolution']}</td>
                  <td className='col4'>{product['Screen.type']}</td>
                  <td className='col5'>{product['Screen.touch'] ? 'tak' : 'nie'}</td>
                  <td className='col6'>{product['Processor.name']}</td>
                  <td className='col7'>{product['Processor.physical_cores']}</td>
                  <td className='col8'>{product['Processor.clock_speed']}</td>
                  <td className='col9'>{product['Ram.capacity']}</td>
                  <td className='col10'>{product['Disc.storage']}</td>
                  <td className='col11'>{product['Disc.type']}</td>
                  <td className='col12'>{product['Graphic_card.name']}</td>
                  <td className='col13'>{product['Graphic_card.memory']}</td>
                  <td className='col14'>{product.os}</td>
                  <td className='col15'>{product.disc_reader}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
      </section>
    </div>
  )
}

export default Client