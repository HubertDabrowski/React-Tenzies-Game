import {useState, useEffect} from "react";
import '../styles/App.css'
import Dice from './Dice'
import Confetti from 'react-confetti'

const App = () => {
  const createNewDice = () =>{
    const randNumbers = [];
    for(let i=0;i<10;i++){
      randNumbers.push(
        {
          id: i,
          number: Math.floor(Math.random()*6)+1,
          isStopped: false
        })
    }
    return randNumbers;
  }
  
  const [dice, setDice] = useState(createNewDice());
  const [isWin, setIsWin] = useState(false)

  useEffect(()=>{
    const isHeld=[];
    const isTheSame = [];

    for(let i=0;i<dice.length;i++){
      if(dice[i].isStopped){
        isHeld.push(true)
      }

      if(i===0){
        isTheSame.push(true)
      }else{
        if(dice[i-1].number === dice[i].number){
          isTheSame.push(true)
        }
      }
    }

    if(isHeld.length===10 && isTheSame.length===10){
      console.log('you win');
      setIsWin(true);
    }
  },[dice])

  const stopDice = (id) => {
    const updatedDice = [];
    setDice(prev=>{
      for(let i=0; i<prev.length;i++){
        const tempDice = prev[i];

        if(tempDice.id === id){
          updatedDice.push({...tempDice,isStopped: !tempDice.isStopped})
        }else{
          updatedDice.push(tempDice)
        }
      }

      return updatedDice;
    })
  }
 
  const diceComp = dice.map( die =>{
    return (
      <Dice 
        isStopped={die.isStopped} 
        value={die.number} 
        key={die.id}
        id={die.id} 
        handler={stopDice}
      />)
  })

  const rollDice = () => {
    const updatedDice = [];
    setDice((prev)=>{
      for(let i=0;i<10;i++){
        if(!prev[i].isStopped){
          updatedDice.push({...prev[i], number: Math.floor(Math.random()*6)+1});
        }else{
          updatedDice.push(prev[i]);
        }
      }

      return updatedDice;
    })
  }

  const startNewGame = () => {
    setDice(createNewDice());
    setIsWin(false);
  }

  return(
    <main className="main">
      {isWin && <Confetti/>}
      <h1 className="title">{isWin?'You won!':'Tenzies!'}</h1>
      <h3 className="desc">Roll until all dice are the same. Click each die to freeze it at it's current value between rolls.</h3>
      <div className="dice-container">
        {diceComp}
      </div>
      <button onClick={isWin?startNewGame:rollDice} className="button">{isWin?'New Game':'Roll'}</button>
    </main>
  );
}

export default App