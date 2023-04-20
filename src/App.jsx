import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LaptopData from './pages/LaptopData'
import Client from './pages/Client'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/server' element={<LaptopData/>}/>
          <Route path='/client' element={<Client/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
