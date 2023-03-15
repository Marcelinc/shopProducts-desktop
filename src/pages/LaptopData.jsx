import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Popup from '../components/Popup'
import '../styles/LaptopData.css'

const LaptopData = () => {

    const [products,setProducts] = useState([])
    const [showWarning,setWarning] = useState(false)
    const [badData,setBadData] = useState([])

    const loadFile = () => {
      window.api.send('toMainReadFile')
      window.api.receive("fromMainReadFile", (data) => {
       //console.log(`Received ${data} from main process`);
       setProducts(data)
      });
    }

    const saveFile = () => {
      setBadData([])
      let tempData = []
      products.forEach((product,item) => {
        console.log(product[12])
        if(product.includes('') || !product[1].match(/^[0-9]+"$/) || !product[2].match(/^[1-9][0-9]+x[1-9][0-9]+$/) || !product[6].match(/^[1-9]+$/) || !product[7].match(/^[1-9][0-9]+$/) ||
          !product[8].match(/^[1-9]+GB$/) || !product[9].match(/^[1-9][0-9]+GB$/) || !product[12].match(/^[1-9][0-9]*GB$/))  
          //checking if there are empty cells || if cell 1 is 12", || 1000x800 || liczba rdzeni np. 4 || taktowanie || ram - 8GB || pojemność dysku - 500GB || pamięć układu graficznego
          tempData.push(item)
      })
      //console.log(tempData)
      if(tempData.length > 0){
        setBadData(tempData)
        setWarning(true)
      }
    }

    const setInput = (e,row,col) => {
      let content = e.target.textContent
      let input = document.createElement('input')
      input.setAttribute('type','text')
      input.setAttribute('value',content)
      input.onkeyup = e => {
        if(e.keyCode === 13){
          //read data from input
          let newContent = e.target.value
          console.log(e.target.offsetParent)
          //save new given data to products
          let updatedProducts = products
          updatedProducts[row][col] = newContent
          setProducts(updatedProducts)

          //change input to text
          e.target.offsetParent.innerHTML = newContent
        }
      }
      e.target.innerHTML=''
      e.target.appendChild(input)
    }

  return (
    <div className='container'>
        <section className='buttons'>
            <Button text='Wczytaj dane z pliku TXT' handler={loadFile}/>
            <Button text='Zapisz dane do pliku TXT' handler={saveFile}/>
        </section>
        <section className='content'>
          <table>
            <thead>
              {products.length > 0 && <tr>
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
              {products.length > 0 && products.map((product,item) => <tr key={item} id={'row'+item}>
                <td>{item+1}</td>
                <td className='col0' onDoubleClick={e => setInput(e,item,0)}>{product[0]}</td>
                <td className='col1' onDoubleClick={e => setInput(e,item,1)}>{product[1]}</td>
                <td className='col2' onDoubleClick={e => setInput(e,item,2)}>{product[2]}</td>
                <td className='col3' onDoubleClick={e => setInput(e,item,3)}>{product[3]}</td>
                <td className='col4' onDoubleClick={e => setInput(e,item,4)}>{product[4]}</td>
                <td className='col5' onDoubleClick={e => setInput(e,item,5)}>{product[5]}</td>
                <td className='col6' onDoubleClick={e => setInput(e,item,6)}>{product[6]}</td>
                <td className='col7' onDoubleClick={e => setInput(e,item,7)}>{product[7]}</td>
                <td className='col8' onDoubleClick={e => setInput(e,item,8)}>{product[8]}</td>
                <td className='col9' onDoubleClick={e => setInput(e,item,9)}>{product[9]}</td>
                <td className='col10' onDoubleClick={e => setInput(e,item,10)}>{product[10]}</td>
                <td className='col11' onDoubleClick={e => setInput(e,item,11)}>{product[11]}</td>
                <td className='col12' onDoubleClick={e => setInput(e,item,12)}>{product[12]}</td>
                <td className='col13' onDoubleClick={e => setInput(e,item,13)}>{product[13]}</td>
                <td className='col14' onDoubleClick={e => setInput(e,item,14)}>{product[14]}</td>
              </tr>)}
            </tbody>
          </table>
        </section>
        {showWarning && <Popup setWarning={setWarning} badData={badData} products={products}/>}
    </div>
  )
}

export default LaptopData