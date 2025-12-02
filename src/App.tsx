import { useState } from 'react'
<<<<<<< HEAD
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
=======
>>>>>>> 175c7d0054eb30ac7aae6eeed4edf19852a79882
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<<<<<<< HEAD
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
=======
      <header><h1>WATERMART TRACKER</h1></header>
      
>>>>>>> 175c7d0054eb30ac7aae6eeed4edf19852a79882
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
<<<<<<< HEAD
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
=======
        </div>
      </>
>>>>>>> 175c7d0054eb30ac7aae6eeed4edf19852a79882
  )
}

export default App
