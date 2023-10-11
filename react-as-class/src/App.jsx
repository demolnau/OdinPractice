import { useState } from 'react'
import './App.css'
import ClassInput from './ClassInput'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React List as a Class</h1>
      <ClassInput></ClassInput>
      
    </>
  )
}

export default App
