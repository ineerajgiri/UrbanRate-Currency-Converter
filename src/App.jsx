import { useState } from 'react'
import { InputBox } from './compnents' 
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [error, setError] = useState(null)
  const [isWarning, setIsWarning] = useState(false) // Warning vs Error check

  const currencyInfo = useCurrencyInfo(from)
  
  // Isse dropdown hamesha bhari rahegi
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  
  const convert = () => {
    // Case 1: Bilkul hi data nahi hai (Pehli baar app khola aur net nahi hai)
    if (options.length === 0) {
      setError("No data available. Please connect to internet at least once.")
      setIsWarning(false)
      return
    }

    // Case 2: Data cache se mil gaya par internet nahi hai
    if (!navigator.onLine) {
        setError("Working Offline: Showing last saved rates.")
        setIsWarning(true) // Orange/Yellow color for warning
    } else {
        setError(null) // Sab sahi hai toh error hata do
    }

    // Conversion Logic
    if (currencyInfo[to]) {
        setConvertedAmount(amount * currencyInfo[to])
    } else {
        setError("This currency rate is not available offline.")
        setIsWarning(false)
    }
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat transition-all"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                
                {/* --- Dynamic Notification Box --- */}
                {error && (
                  <div className={`${isWarning ? 'bg-orange-500/80' : 'bg-red-500/80'} text-white text-center p-2 mb-4 rounded-lg text-sm border shadow-lg`}>
                    {isWarning ? '⚠️' : '🚫'} {error}
                  </div>
                )}

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => {
                                setFrom(currency)
                                setError(null) // Nayi currency select karne par error reset
                            }}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 hover:scale-110 active:scale-95 transition-all"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default App;