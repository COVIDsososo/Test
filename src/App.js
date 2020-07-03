import React, { useState, useEffect, useReducer } from 'react';
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
  const index = i < imgs.length ? i : i - imgs.length

  // console.log(`i = ${i}, index = ${index}`)
  squares.push({
    id: i,
    img: imgs[index]
  })
}


const Shuffle = (arr) => { //принимает массив ирандомно распределяет элементы его и возврщают новый массив
  let i, j, temp;

  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));//каждый встреченный элемент меняется рандомно с другим
      temp = arr[i];//три кружки
      arr[i] = arr[j]; //време перем хапихивается элем Итый, чтобы поменять его с ждитым
      arr[j] = temp;
  }
  return arr;
};
squares = Shuffle(squares);  //если без жоравно, то она также был запустилась, но в скверс не записалось бы


const reducer = (stateReducer, action) => {
  switch(action.type){
    case "Increment":
      return stateReducer + 1;
    case "Decrement":
      return stateReducer - 1;
    default:
      return stateReducer;
  }
}


const App = () => {
  const [openSquares, setOpenSquares] = useState([]);  //массив айдишников - записываются отгаданные - записываются чтобы быть открытыми
  const [temporaryOpenSquares, setTemporaryOpenSquares] = useState([]); //открытые в текущем раунде квадраты

  useEffect(() => {
    setTimeout(() => {
      check()
    }, 1000)
  }, [temporaryOpenSquares])

  const check = () => {
    // console.log('check', newtemporaryOpenSquares)
    if (temporaryOpenSquares.length > 1) {
      if (temporaryOpenSquares[0].img === temporaryOpenSquares[1].img) {
        setOpenSquares([
          ...openSquares,
          temporaryOpenSquares[0].id,
          temporaryOpenSquares[1].id
        ]);//= УСПЕХ = устанавливается openSquares, раскрывается его содержимое
      }              //и добавляется первый и второй элементы newTmpSquares
      setTemporaryOpenSquares([]);  // = ТАК ИЛИ ИНАЧЕ = newTmpSquares обнуляется

      if (duplicatesNumber * imgs.length === openSquares.length + 2) {alert('You won')}
      console.log(duplicatesNumber * imgs.length);
      console.log(openSquares.length + 2)
      return;
    };
  }

  const squareClick = (item) => {
    if (isOpen(item.id)) return false
    let newTmpSquares = [...temporaryOpenSquares, item]  // ели нихуя, то итем +, ели что то то к нему еще и итем
    setTemporaryOpenSquares(newTmpSquares);
    //console.log('click', newTmpSquares, temporaryOpenSquares) // async state problem
  }

  const isOpen = (id) => {
    // console.log('id =', id, openSquares, openSquares.includes(id))
    return openSquares.includes(id) || //открыт ли квадрат в предыдущих раунда
      (temporaryOpenSquares[0] && temporaryOpenSquares[0].id === id) ||
      (temporaryOpenSquares[1] && temporaryOpenSquares[1].id === id)
  }

  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
    <div> count: {count} </div>
    <button onClick={() => dispatch({type: "Increment"})}>Increment</button>
    <button onClick={() => dispatch({type: "Decrement"})}>Decrement</button>
      <header className="App-header">
      {squares.map(item => ( //массив результатов выполнения действий к массиву дубликатов с id-шниками элементов
        <div key={item.id}
        onClick={() => squareClick(item)}
        style={{
          backgroundColor: 'grey',
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
