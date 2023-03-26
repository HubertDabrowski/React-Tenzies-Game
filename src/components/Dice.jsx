import React from "react";
import '../styles/Dice.css'

const Dice = (props) => {
  const style={
    backgroundColor: props.isStopped ? 'rgb(32, 177, 32)' : 'rgb(231, 225, 225)'
  }

  return(
    <div className="dice" style={style} onClick={()=>props.handler(props.id)}>
      {props.value}
    </div>
  )
}

export default Dice