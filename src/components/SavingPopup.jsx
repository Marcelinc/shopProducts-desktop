import React, {useState} from 'react'
import '../styles/Popup.css'
import { converterArray2XML } from '../scripts/converterArray2XML'

const Popup = ({setWarning,badData,products,fileType}) => {

  const [loading,setLoading] = useState(false)
  const [saved,setSaved] = useState(false)
  const [modified,setModified] = useState(products.filter(p => !p.includes('duplicate')))

  const backToWindow = () => {
    //color all rows to white
    for(let i=0;i<products.length; i++){
      let row = document.querySelector('#row'+i)
      //if(row && !products[data].includes('duplicate') && !products[data].includes('modified'))
        //row.style.backgroundColor="rgb(78, 74, 74)"
    }
    
    //if not saved color rows with warnings
    if(!saved){
      badData.forEach(data => {
        let row = document.querySelector('#row'+data)
        if(row && !products[data].includes('duplicate'))
          row.style.backgroundColor="orange"
      })
    }
    if(saved){
      //if saved change to default colors
      products.map((p,index) => {
        if(p.includes('modified')){
          ///change color
        }
      })
    }
    
    //close popup
    setWarning(false)
  }

  const saveToFile = () => {
    setLoading(true)
    //console.log('productsTosave:',products)

    //saveToFile
    if(fileType === 'TXT'){
      window.api.send('toMainWriteFile',products)

      window.api.receive('fromMainWriteFile', response => {
        //console.log('Updated: ',response)
        setSaved(response)
        setLoading(false)
      })
    }
    
    if(fileType === "XML"){
      window.api.send('toMainWriteXML',converterArray2XML(products))
      window.api.receive('fromMainWriteXML',res => {
        //console.log(res)
        setSaved(res)
        setLoading(false)
      })
    }

    if(fileType === 'DB'){
      window.api.send('toMainWriteDB',modified)
      window.api.receive('fromMainWriteDB',res => {
        console.log('res',res)
        setSaved(res)
        setLoading(false)
      })
    }

    //close popup
    //setWarning(false)
  }

  return (
    <div className='popup'>
        <div className='content'>
            {badData.length > 0 ? <>
              <h3>Tabela zawiera błędne dane</h3>
              <span id='info'>Wprowadź prawidłowe dane lub ignoruj i zapisz zmiany do pliku</span>
            </> : modified.length === 0 ? <h3>Brak zmodyfikowanych danych do zapisania</h3>
            : <h3>Zapisywanie do {fileType === 'DB' ? 'bazy danych' : fileType}</h3>}
            <p id='bttns'>
              <button onClick={backToWindow}>Powrót</button>
              <button onClick={saveToFile} disabled={saved || modified.length === 0}>{loading ? 'Zapisywanie' : saved ? 'Zapisano' : 'Zapisz'}</button>
            </p>
        </div>
    </div>
  )
}

export default Popup