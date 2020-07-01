import React, { useState } from 'react';
import './App.css';

const duplicatesNumber = 2;
const colors = ['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'purple', 'white'];
let squares = [];

for (let i = 0; i < duplicatesNumber * colors.length; i++) {
  squares.push({
    id: i,
    color: colors[i < colors.length ? i : i - colors.length]
  })
}


const Shuffle = (arr) => {
  let i,
      j,
      temp;

  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  }
  return arr;
};
squares = Shuffle(squares);


const App = () => {
  const [openSquares, setOpenSquares] = useState([])

  function squareClick(item) {
    setOpenSquares([...openSquares, item.id])
  }

  function isOpen(id) {
    return openSquares.includes(id)
  }

  return (
    <div className="App">
      <header className="App-header">
      {squares.map(item => (
        <div key={item.id}
        className="square"
        onClick={() => squareClick(item)}
        style={{
          backgroundColor: isOpen(item.id) ? item.color : 'grey',
          width: 60,
          height: 60
        }} />
      ))}
      </header>
    </div>
  );
}

export default App;
