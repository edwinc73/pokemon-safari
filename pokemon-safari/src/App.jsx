import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

import Key from "../src/features/Key/Key"
import Player from "../src/features/Player/Player"
import { handleMovement } from './js/movement'

function App() {
  console.log(handleMovement)
  const [direction, setDirection] = React.useState({
    direction: "walk-down",
    movementValue:{
      x: -610,
      y: -1150
      // x: -52,
      // y: -1150
    }
  })
  useEffect(()=>{
    setDirection({
      direction: "walk-down",
      movementValue:{
        x: parseFloat(document.querySelector(".game-window").style.left),
        y: parseFloat(document.querySelector(".game-window").style.top)
      }
    })
  }, [])

  const backgroundSize = {
    width: 1120 * 4,
    height: 608 * 4
  }

  const collisionMap = collisions


  const directionKeys = ["↑","←","↓","→"]
  const keyNames = ["ArrowUp","ArrowLeft", "ArrowDown", "ArrowRight"]

  React.useEffect(()=>{
    const handleMovementWithState = handleMovement(direction, setDirection, directionKeys);
    document.addEventListener('keydown', handleMovementWithState);
    return () => {
      document.removeEventListener('keydown', handleMovementWithState);
    };
  }, [])

  const backgroundStyle ={
    top: `${direction.movementValue.y}px`,
    left: `${direction.movementValue.x}px`,
    width: `${backgroundSize.width}px`,
    height: ` ${backgroundSize.height}px`
  }

  return (
    <>
      <div className="background-color">
        <div className="game d-flex">
          <img src="/bg-map.png" id="game-backdrop"alt="" />
          <div className="game-window p-5" style={backgroundStyle}>
            <img src="/game-map.png" alt="" />
          </div>
            <Player direction = {direction.direction} />
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
