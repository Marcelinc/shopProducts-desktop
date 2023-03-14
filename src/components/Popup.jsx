import React, {useState} from 'react'
import '../styles/Popup.css'

const Popup = ({setWarning,badData,products}) => {

  const [loading,setLoading] = useState(false)
  const [saved,setSaved] = useState(false)

  //console.log('badData',badData)

  const backToWindow = () => {
    //color all rows to white
    for(let i=0;i<products.length; i++){
      let row = document.querySelector('#row'+i)
      if(row)
        row.style.backgroundColor="white"
    }
    //if not saved color rows with warnings
    if(!saved){
      badData.forEach(data => {
        let row = document.querySelector('#row'+data)
        if(row)
          row.style.backgroundColor="orange"
      })
    }
    
    //close popup
    setWarning(false)
  }

  const saveToFile = () => {
    setLoading(true)
    //console.log('productsTosave:',products)

    //saveToFile
    window.api.send('toMainWriteFile',products)

    window.api.receive('fromMainWriteFile', response => {
      //console.log('Updated: ',response)
      setSaved(true)
      setLoading(false)
    })

    //close popup
    //setWarning(false)
  }

  return (
    <div className='popup'>
        <div className='content'>
            <h3>Tabela zawiera błędne dane</h3>
            <span id='info'>Wprowadź prawidłowe dane lub ignoruj i zapisz zmiany do pliku</span>
            <p id='bttns'>
              <button onClick={backToWindow}>Powrót</button>
              <button onClick={saveToFile} disabled={saved}>{loading ? 'Zapisywanie' : saved ? 'Zapisano' : 'Zapisz'}</button>
            </p>
        </div>
    </div>
  )
}

export default Popup