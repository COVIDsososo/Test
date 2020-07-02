import React, { useState } from 'react';
import './App.css';
import pol1 from '../img/pol1.jpg'
import pol2 from '../img/pol2.jpg'
import pol3 from '../img/pol3.jpg'
import pol4 from '../img/pol4.jpg'
import pol5 from '../img/pol5.jpg'
import pol6 from '../img/pol6.jpg'
import pol7 from '../img/pol7.jpg'
import pol8 from '../img/pol8.jpg';

/*
import {
  pol1,
  pol2,
  pol3
} from '../img/index.js'
*/

const duplicatesNumber = 2;
const imgs = [pol1, pol2, pol3, pol4, pol5, pol6, pol7, pol8];
let squares = [];

for (let i = 0; i < duplicatesNumber * imgs.length; i++) {
  squares.push({
    id: i,
    img: imgs[i < imgs.length ? i : i - imgs.length]
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
      if (pick[0].img === pick[1].img) {
        setOpenSquares([...openSquares, pick[0].id, pick[1].id]);
      //  setCount (0);
        setPick([]); //добавил
      }
      setCount (0);
      setPick ([]);
      return;
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
    <div>
      <header className="App-header">
      {squares.map(item => (
        <div key={item.id}
        onClick={() =>
          isOpen(item.id) ? item.style={color: 'grey'} : squareClick(item)
        }   //добавил
        style={{
          backgroundColor: isOpen(item.id) ? item.img : 'grey',
          width: 60,
          height: 60
        }}>
           <img src={item.img} style={{
             display: isOpen(item.id) ? 'block' : 'none'
           }} />
        </div>
        ))}
      </header>

    </div>
  );
}

export default App;
