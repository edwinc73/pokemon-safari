import React from "react"
import "./Player.scss"

export function Player(props){
  const {direction} = props

  const playerStyle = {
    backgroundImage: `url(${direction}.png)`
  };

  return(
    <>
    <div className="player-container d-flex justify-content-center align-items-center">
      <div id="player" style={playerStyle}></div>
    </div>
    </>
  )
}

export function PlayerThrowing(){

  const throwStyle = {
    backgroundImage: `url(./throwing.png)`
  };
  return(
    <>
      <div className="img-container throw" id="player-throwing" style={throwStyle}></div>
    </>
  )
}
