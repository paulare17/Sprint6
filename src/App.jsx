// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Portada from './components/Portada'
import Targetes from './components/Targetes'
import dataTargetes from './data-targetes'

function App() {
  // const [count, setCount] = useState(0)

  const printTargetes = dataTargetes.map((targeta) => {
    return (
        <Targetes
            key={targeta.id}
           {...targeta}
        />
    )
})



  return (
    <>
  <Navbar/>
  <Portada/>
  {printTargetes}
    </>
  )
}

export default App
