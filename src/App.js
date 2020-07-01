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
  const [openSquares, setOpenSquares] = useState([]);
  const [count, setCount] = useState(0);
  const [pick, setPick] = useState([]);

  const squareClick = (item) => {
    if (count === 2) {
      if (pick[0].color === pick[1].color) {
        setOpenSquares([...openSquares, pick[0].id, pick[1].id]);
        setPick([]);
      }
    setCount (0);
    setPick ([]);
    return ;
    };
    setCount (count + 1);
    setPick ([...pick, item]);
    }


  const isOpen = (id) => {
    return openSquares.includes(id) ||
      (pick[0] && pick[0].id === id) ||
      (pick[1] && pick[1].id === id)
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
