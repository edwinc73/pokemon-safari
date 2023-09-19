import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

import Key from "../src/features/Key/Key"
import Player from "../src/features/Player/Player"

function App() {
  const [direction, setDirection] = React.useState("walk-down")

  const directionKeys = ["↑","←","↓","→"]
  const keyNames = ["ArrowUp","ArrowLeft", "ArrowDown", "ArrowRight"]

  let playerDirection = "walk-down"

  const handleMovement = e => {
    const player = document.getElementById('player');

    switch (e.key) {
      case "ArrowUp":
        playerDirection = "walk-up"
        break;
      case "ArrowDown":
        playerDirection = "walk-down"
        break;
      case "ArrowLeft":
        playerDirection = "walk-left"
        break;
      case "ArrowRight":
        playerDirection = "walk-right"
        break;
      default:
        break;
    }
    setDirection(playerDirection)

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

  return (
    <>
      <div className="game d-flex">
        <div className="game-window p-5">
          <Player
          direction = {direction}
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
