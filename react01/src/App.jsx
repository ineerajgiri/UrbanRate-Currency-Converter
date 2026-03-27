import { useState } from 'react'

import './App.css'

function App() {
  const [counter, setCounter] = useState(0)
  const addValue = () => {
    if (counter >= 20) {
      alert("Areh bas bhai ");
      return;
    }
    setCounter(counter + 1)
  }

  const decreaseValue = () => {
    if (counter <= 0) {
      alert("isse niche allowed nahi h");
      return;
    }
    setCounter(counter - 1)
  }

  return (
    <>
      <h1> NEERAJ JII AJJ KHEL KARNA H !</h1>
      <h2>counter value: {counter}</h2>
<button className="btn" onClick={addValue}>Add value</button>
      <br />
<button className="btn" onClick={decreaseValue}>decrease value</button>
    </>
  )
}

export default App
