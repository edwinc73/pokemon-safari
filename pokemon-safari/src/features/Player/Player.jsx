import React from "react"
import "./Player.scss"

export default function Player(props){
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
