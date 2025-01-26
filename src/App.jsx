import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DynamicLines from './dynamicLines'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DynamicLines/>
    </>
  )
}

export default App
