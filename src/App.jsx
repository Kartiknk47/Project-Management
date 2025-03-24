import { useState } from 'react'
import './App.css'
import FetchApiProject from './Components/FetchApiProject'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <FetchApiProject/>

    </>
  )
}

export default App
