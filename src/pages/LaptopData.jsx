import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import SavingPopup from '../components/SavingPopup'
import { converterObj2Array } from '../scripts/converterObj2Array'
import '../styles/LaptopData.css'
import { converterDB2Array } from '../scripts/converterDB2Array'
import { check4duplicates } from '../scripts/duplicates'
import { colorRows } from '../scripts/colorRows'

const LaptopData = () => {

    const [products,setProducts] = useState([])
    const [records,setRecords] = useState(0)
    const [duplicatesCount,setDuplicatesCount] = useState(0)
    const [showWarning,setWarning] = useState(false)
    const [badData,setBadData] = useState([])
    const [fileType,setType] = useState('TXT')
    const [readingFile,setReadingFile] = useState('TXT')


    useEffect(() => {
      colorRows(products)
    },[products])

    const loadTXT = () => {
      setReadingFile('TXT')
      window.api.send('toMainReadFile')
      window.api.receive("fromMainReadFile", (data) => {
       //console.log(`Received ${data} from main process`);
       check4duplicates(products,data)
       setProducts([...data,...products])
       //colorRows([...data,...products])
      });
    }

    const loadXML = () => {
      setReadingFile('XML')
      window.api.send('toMainReadXML')
      window.api.receive('fromMainReadXML', (data) => {
        var convertedData = converterObj2Array(data.laptops.laptop)
        check4duplicates(products,convertedData)
        setProducts([...convertedData,...products])
        //colorRows([...convertedData,...products])
      })
    }

    const saveFile = (type) => {
      //console.log('check data')
      setBadData([])
      let tempData = []
      products.forEach((product,item) => {
        if((product.includes('') || !product[1].match(/^[0-9]+"$/) || !product[2].match(/^[1-9][0-9]+x[1-9][0-9]+$/) || !(product[6]+'').match(/^[1-9]+$/) || !(product[7]+'').match(/^[1-9][0-9]+$/) ||
          !product[8].match(/^[1-9]+GB$/) || !product[9].match(/^[1-9][0-9]+GB$/) || !product[12].match(/^[1-9][0-9]*GB$/)) && !product.includes('duplicate'))  
          //checking if there are empty cells || if cell 1 is 12", || 1000x800 || liczba rdzeni np. 4 || taktowanie || ram - 8GB || pojemność dysku - 500GB || pamięć układu graficznego
          tempData.push(item)
      })

      //set fileType to save
      setType(type)
      console.log(tempData)

      //console.log(tempData)
      if(tempData.length > 0){
        setBadData(tempData)
      }
      setWarning(true)
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
          //console.log(e.target.offsetParent)
          //save new given data to products
          let updatedProducts = products
          updatedProducts[row][col] = newContent
          
          //check if not duplicated
          var dup = check4duplicates(products,[updatedProducts[row]])
          console.log(dup)
          if(dup < 2){
           
            //no duplicates
            updatedProducts[row].pop()
            updatedProducts[row].push('modified')

            //change color
            document.querySelector('#row'+row).style.backgroundColor = 'white'
            document.querySelector('#row'+row).style.color = 'black'
          }
          setProducts(updatedProducts)
          //change input to text
          e.target.offsetParent.innerHTML = newContent
        }
      }
      e.target.innerHTML=''
      e.target.appendChild(input)
    }

    const readDB = () => {
      setReadingFile('Database')
      window.api.send('toMainReadDB')
      window.api.receive('fromMainReadDB', (data) => {
        console.log('datafromdb:',data)
        let arrayData = converterDB2Array(data)
        let dup = check4duplicates(products,arrayData)
        setDuplicatesCount(dup)
        setRecords(arrayData.length - dup)
        //add products to view 
        setProducts([...arrayData,...products])
        //color new rows
        //colorRows([...arrayData,...products])
      })
    }

  return (
    <div className='container'>
        <section className='buttons'>
            <Button text='Wczytaj dane z pliku TXT' handler={loadTXT}/>
            <Button text='Zapisz dane do pliku TXT' handler={() => saveFile('TXT')}/>
            <Button text='Import z Bazy Danych' handler={readDB}/>
            <Button text='Eksport do Bazy Danych' handler={() => saveFile('DB')}/>
            <Button text='Wczytaj dane z pliku XML' handler={loadXML}/>
            <Button text='Zapisz dane do pliku XML' handler={() => saveFile('XML')}/>
        </section>
        <section className='content'>
          {products.length > 0 && <p><strong>Źródło:</strong> {readingFile}{readingFile === 'Database' && ', odczytano ' + records + ' nowych rekordów, '+ duplicatesCount + ' duplikatów'} </p>}
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
        {showWarning && <SavingPopup setWarning={setWarning} badData={badData} products={products} fileType={fileType}/>}
    </div>
  )
}

export default LaptopData