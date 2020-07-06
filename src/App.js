import React, { useEffect, useReducer } from 'react';
import './App.css';
import pol1 from '../img/pol1.jpg'
import pol2 from '../img/pol2.jpg'
import pol3 from '../img/pol3.jpg'
import pol4 from '../img/pol4.jpg'
import pol5 from '../img/pol5.jpg'
import pol6 from '../img/pol6.jpg'
import pol7 from '../img/pol7.jpg'
import pol8 from '../img/pol8.jpg';

const duplicatesNumber = 2;
const imgs = [pol1, pol2, pol3, pol4, pol5, pol6, pol7, pol8];
let squares = [];

for (let i = 0; i < duplicatesNumber * imgs.length; i++) {
  const index = i < imgs.length ? i : i - imgs.length //i7 in 7, i8 in 0, i9 in 1
  squares.push({
    id: i,
    img: imgs[index]
  })
}

const Shuffle = (arr) => {
  let i, j, temp;
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
  const initialState = {
    openSquares: [],
    temporaryOpenSquares: []
  };

  const reducer = (state, action) => {
    switch(action.type){
      case "CaseTemporaryOpenSquares":
        return {
          ...state,
          temporaryOpenSquares: []
        }
      case "CaseOpenSquares":
        return {
          ...state,
          openSquares: [
            ...state.openSquares,
            state.temporaryOpenSquares[0].id,
            state.temporaryOpenSquares[1].id
          ],
        }
      case "CaseSquareClick":
        return {
          ...state,
          temporaryOpenSquares: [
            ...state.temporaryOpenSquares,
            action.item
          ]
        }
      default:
        return alert('err');
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const {openSquares, temporaryOpenSquares} = state;

  const check = () => {
    if (state.temporaryOpenSquares.length > 1) {
      if (state.temporaryOpenSquares[0].img === state.temporaryOpenSquares[1].img) {
        dispatch({type: "CaseOpenSquares"});
        }
      dispatch({type: "CaseTemporaryOpenSquares"});
      if (duplicatesNumber * imgs.length === state.openSquares.length + 2) {
        alert('You won');
      }
      return;
    };
  }

  const isOpen = (id) => {
    return state.openSquares.includes(id) || 
      (state.temporaryOpenSquares[0] && state.temporaryOpenSquares[0].id === id) ||
      (state.temporaryOpenSquares[1] && state.temporaryOpenSquares[1].id === id)
  }

  const squareClick = (item) => {
    if (isOpen(item.id)) return false;
    dispatch({type: "CaseSquareClick", item: item});
    }

  useEffect(() => {
    setTimeout(() => {
      check()
    }, 500)
  }, [temporaryOpenSquares])

  return (
    <div>
      <header className="App-header">
      {squares.map(item => (
        <div key={item.id}
        onClick={() => squareClick(item)}
        style={{
          backgroundColor: 'grey',
          width: 60,
          height: 60
        }}>
           <img src={item.img} alt={item.index} style={{
             display: isOpen(item.id) ? 'block' : 'none'
           }} />
        </div>
        ))}
      </header>
    </div>
  );
}


export default App;
