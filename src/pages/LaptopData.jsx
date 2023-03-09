import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
//import { readFile } from '../scripts/readFile'

const LaptopData = () => {

    const [products,setProducts] = useState([])

    useEffect(() => {
       // setProducts(readFile('./../katalog.txt'))
    },[])

  return (
    <div>
        <section className='buttons'>
            <Button text='Wczytaj dane z pliku TXT'/>
            <Button text='Zapisz dane do pliku TXT'/>
        </section>
        <section className='content'>
          <table>
            <thead>
              <tr>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Dell</td>
              </tr>
            </tbody>
          </table>
        </section>
    </div>
  )
}

export default LaptopData