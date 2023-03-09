import { useState } from 'react'
import './App.css'
import LaptopData from './pages/LaptopData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <LaptopData/>
    </div>
  )
}

export default App
