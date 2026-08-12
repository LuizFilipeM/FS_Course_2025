import { useState } from 'react'

const App = () => {
  const [ contador, setContador ] = useState(0)
  

  const handleClique = () => {
    console.log('clicado')
  }

  return (
    <div>
      <div>{contador}</div>

      <button onMouseMove={() => setContador(contador + 1)}>
        mais+
      </button>
      <br />
      <button onClick={()=> setContador(0)}>
        zerar
      </button>
    </div>
  )
}

export default App