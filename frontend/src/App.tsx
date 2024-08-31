import { useState } from 'react'
import TestPage from './pages/test'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <TestPage />
    </div>
  )
}

export default App
