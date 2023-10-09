import React from "react"
import "./Player.scss"
import { selectPosition } from '../../selectors/selectors'
import { useDispatch, useSelector } from 'react-redux'

export function Player(){
  const dispatch = useDispatch()
  const position = useSelector(selectPosition)
  const playerStyle = {
    backgroundImage: `url(${position.direction}.png)`
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
