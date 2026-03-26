import { useState, useEffect } from 'react';

function Game() {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1 and 100!');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setTarget(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleCheck = () => {
    const numGuess = parseInt(guess);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts(attempts + 1);

    if (numGuess === target) {
      setMessage(`Correct! The number was ${target}. You took ${attempts + 1} attempts.`);
      setGuess('');
    } else if (numGuess < target) {
      setMessage('Too low! Try higher.');
    } else {
      setMessage('Too high! Try lower.');
    }
  };

  const handleReset = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('New game! Guess a number between 1 and 100!');
    setAttempts(0);
  };

  const gameStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #4a5568',
    backgroundColor: '#2d3748',
    color: 'white',
    width: '150px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4299e1',
    color: 'white',
    cursor: 'pointer',
    marginRight: '10px'
  };

  const messageStyle = {
    marginTop: '20px',
    fontSize: '18px',
    fontWeight: 'bold'
  };

  return (
    <div style={gameStyle}>
      <h2 style={{ marginBottom: '20px' }}>Guess the Number!</h2>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        style={inputStyle}
        placeholder="1-100"
      />
      <button onClick={handleCheck} style={buttonStyle}>Check</button>
      <button onClick={handleReset} style={{ ...buttonStyle, backgroundColor: '#48bb78' }}>New Game</button>
      <div style={messageStyle}>{message}</div>
      {attempts > 0 && <div style={{ marginTop: '10px', fontSize: '14px' }}>Attempts: {attempts}</div>}
    </div>
  );
}

export default Game;
