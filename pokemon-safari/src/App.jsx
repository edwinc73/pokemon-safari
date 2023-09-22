import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

import Key from "../src/features/Key/Key"
import Player from "../src/features/Player/Player"

function App() {

  const backgroundSize = {
    width: 1120 * 4,
    height: 608 * 4
  }

  const collisionMap = collisions

  console.log(collisionMap)
  const [direction, setDirection] = React.useState({
    direction: "walk-down",
    movementValue:{
      x: -585,
      y: -1705
    }
  })

  const directionKeys = ["↑","←","↓","→"]
  const keyNames = ["ArrowUp","ArrowLeft", "ArrowDown", "ArrowRight"]

  const handleMovement = e => {
    const player = document.getElementById('player');
    const squareValueWidth = 65.9
    const squareValueheight = 67.5

    switch (e.key) {
      case "ArrowUp":
        setDirection(prevState => {
          return({
            direction: "walk-up",
            movementValue:{
              x: prevState.movementValue.x,
              y: prevState.movementValue.y + squareValueheight
            }
          })
        })
        break;
      case "ArrowDown":
        setDirection(prevState => {
          return({
            direction: "walk-down",
            movementValue:{
              x: prevState.movementValue.x,
              y: prevState.movementValue.y - squareValueheight
            }
          })
        })
        break;
      case "ArrowLeft":
        setDirection(prevState => {
          return({
            direction: "walk-left",
            movementValue:{
              y: prevState.movementValue.y,
              x: prevState.movementValue.x + squareValueWidth
            }
          })
        })
        break;
      case "ArrowRight":
        setDirection(prevState => {
          return({
            direction: "walk-right",
            movementValue:{
              y: prevState.movementValue.y,
              x: prevState.movementValue.x - squareValueWidth
            }
          })
        })
        break;
      default:
        break;
    }

    if(keyNames.includes(e.key)){
      const keyName = e.key
      const key = document.querySelector(`#${keyName}`)
      player.classList.add('walking');
      key.classList.add("animate-key");
      setTimeout(() => {
        key.classList.remove("animate-key");
      }, 125);
      setTimeout(() => {
        player.classList.remove('walking');
      }, 1000);
    }
  }

  React.useEffect(()=>{
    document.addEventListener('keydown', handleMovement);
    return () => {
      document.removeEventListener('keydown', handleMovement);
    };
  }, [])

  const backgroundStyle ={
    backgroundPosition: `${direction.movementValue.x}px ${direction.movementValue.y}px`,
    backgroundSize: `${backgroundSize.width}px ${backgroundSize.height}px`
  }

  return (
    <>
      <div className="game d-flex">
        <div className="game-window p-5" style={backgroundStyle}>
          <Player
          direction = {direction.direction}
          />
        </div>
        <Key
          directionKeys = {directionKeys}
          keyNames = {keyNames}
        />
      </div>
    </>
  )
}

export default App
