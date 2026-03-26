import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [characterAllowed, setcharacterAllowed] = useState(false)
  const [password, setpassword] = useState("")

  // Strength State: 'Weak', 'Medium', 'Strong'
  const [strength, setStrength] = useState("Weak")
  // Color State: 'text-red-500', 'text-yellow-500', 'text-green-500'
  const [strengthColor, setStrengthColor] = useState("text-red-500")

  const passwordRef = useRef(null)

  const copypasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password)
  }, [password])

  // Strength Check Logic function
  const checkStrength = useCallback((pass, len, nums, chars) => {
    // 1. Weak Conditions
    if (len < 8 || (!nums && !chars)) {
      setStrength("Weak")
      setStrengthColor("text-red-500")
      return;
    }

    // 2. Strong Conditions: Length > 12 AND both numbers & characters allowed
    if (len >= 12 && nums && chars) {
      setStrength("Strong")
      setStrengthColor("text-green-500")
      return;
    }

    // 3. Medium Condition: Default if not weak or strong
    setStrength("Medium")
    setStrengthColor("text-yellow-500")

  }, []) // Memoize the logic

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*()_+"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setpassword(pass)
    
    // Naya password banne ke baad uski strength check karo
    checkStrength(pass, length, numberAllowed, characterAllowed)

  }, [length, numberAllowed, characterAllowed, checkStrength])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800 text-center'>
      <h1 className='text-white text-center text-2xl my-3'>Password Generator</h1>
      
      <div className='flex shadow rounded-lg overflow-hidden mb-4 relative'>
        <input 
          type="text" 
          value={password} 
          className='outline-none w-full py-1 px-3 bg-white text-black' 
          placeholder='Password'
          readOnly 
          ref={passwordRef}
        />
        <button 
          onClick={copypasswordtoclipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800 active:scale-95 transition-all'>
          Copy
        </button>
      </div>

      {/* --- Password Strength Indicator Bar --- */}
      <div className='w-full h-1 bg-gray-600 rounded-full my-3 overflow-hidden'>
        <div 
          className={`h-full transition-all duration-300 ${strengthColor.replace('text', 'bg')}`}
          style={{ width: strength === 'Weak' ? '33%' : strength === 'Medium' ? '66%' : '100%' }}
        ></div>
      </div>
      
      {/* Strength Text */}
      <div className='text-sm mb-4 font-semibold'>
        Strength: <span className={strengthColor}>{strength}</span>
      </div>
      {/* -------------------------------------- */}

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
            type="range" 
            min={6} 
            max={100} 
            value={length} 
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => { setnumberAllowed((prev) => !prev); }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={characterAllowed}
            id='characterInput'
            onChange={() => { setcharacterAllowed((prev) => !prev); }}
          />
          <label htmlFor='characterInput'>Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App