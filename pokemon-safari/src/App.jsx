import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

import Key from "../src/features/Key/Key"
import Player from "../src/features/Player/Player"
import { handleMovement } from './js/movement'
import {getPokemonData, randomPokemon} from "./js/encounter"
import {mapCoord} from "./js/mapCoord.js"

function App() {
  const [direction, setDirection] = useState({
    direction: "walk-down",
    movementValue:{
      x: -610,
      y: -1150
      // x: 510,
      // y: 530
    }
  })

  // set map locations
  const [collisionMap, setCollisionMap] = useState(()=>mapCoord(collisions))
  const [grassMap, setGrassMap] = useState(()=>mapCoord(grassPatch))

  // encounters
  const [encounter, setEncounter] = useState(false)
  const [pokemonList, setPokemonList] = useState([])
  const [encounteredPokemon, setEncounteredPokemon] = useState("")


  //get all pokemon and store in cache
  useEffect(()=>{
    const fetchData = async () => {
      const data = await getPokemonData();
      setPokemonList(data);
    }
    fetchData();
  },[])

  // movement logic
  useEffect(()=>{
    setDirection({
      direction: "walk-down",
      movementValue:{
        x: parseFloat(document.querySelector(".game-window").style.left) || 0,
        y: parseFloat(document.querySelector(".game-window").style.top) || 0
      }
    })
  }, [])

  useEffect(()=>{
    if(encounter){
      setEncounteredPokemon(randomPokemon(pokemonList))
    }
  }, [encounter])

  useEffect(()=>{
    const handleMovementWithState = handleMovement(direction, setDirection, keyNames, collisionMap, grassMap, setEncounter, encounter);
    document.addEventListener('keydown', handleMovementWithState);
    return () => {
      document.removeEventListener('keydown', handleMovementWithState);
    };
  }, [encounter, direction])

  const directionKeys = ["↑","←","↓","→"]
  const keyNames = ["ArrowUp","ArrowLeft", "ArrowDown", "ArrowRight"]
  const backgroundSize = {
    width: 1120 * 4,
    height: 608 * 4
  }

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
