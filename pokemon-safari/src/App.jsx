import React, { useEffect, useState } from 'react'
import './App.scss'

import Key from "../src/features/Key/Key"
import {Player} from "../src/features/Player/Player"
import { handleMovement } from './js/movement'
import {getPokemonData, randomPokemon} from "./js/encounter"
import {mapCoord} from "./js/mapCoord.js"
import EncounterScreen from "./features/Encounter/EncounterScreen"
import { getEncounteredPokemon } from "../src/js/encounter.js";
import Loading from "../src/features/Loading/Loading"


function App() {
  const [direction, setDirection] = useState({
    direction: "walk-down",
    movementValue:{
      x: -610,
      y: -1150
    }
  })

  // loading
  const [loading, setLoading] = useState(false);

  // set map locations
  const [collisionMap, setCollisionMap] = useState(()=>mapCoord(collisions))
  const [grassMap, setGrassMap] = useState(()=>mapCoord(grassPatch))

  // encounters
  const [encounter, setEncounter] = useState(false)
  const [pokemonList, setPokemonList] = useState([])
  const [encounteredPokemon, setEncounteredPokemon] = useState("")

  //inventory

  const [inventory, setInventory] = useState({
     pokeballs:{
        pokeball: {
          name: "pokeball",
          quantity: 10,
          value: 0,
          rarity: 1
        },
        greatball: {
          name: "greatball",
          quantity: 0,
          value: 20,
          rarity: 0.4
        },
        ultraball: {
          name: "ultraball",
          quantity: 0,
          value: 60,
          rarity: 0.2
        },
        masterball: {
          name: "masterball",
          quantity: 0,
          value: 4000,
          rarity: 0.025
        }
      },
    baits:{
      berry:{
        name: "berry",
        quantity : 5,
        value: 5
      },
      banana:{
        name: "banana",
        quantity : 0,
        value: 15
      }
    },
    etc:[]
  })

  // caught pokemon
  const [caughtPokemonList, setCaughtPokemonList] = useState([])

  //get all pokemon
  useEffect(()=>{
    const fetchData = async () => {
      const data = await getPokemonData();
      setPokemonList(data);
    }
    fetchData();
  },[])

  // loading pokemon in encounter screen

  useEffect(() => {
    if(encounter){
      setLoading(true)
    }
  }, [encounter, encounteredPokemon])

  // loading screen fade in

  useEffect(()=> {
    if(encounter){
      const loadingScreen = document.querySelector(".loading")
      loadingScreen.classList.add("loading-fade-in")
    }
  }, [encounter])


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
    const encounterScreenDOM = document.querySelector("#encounter-screen")
    if(encounter){
      const fetchData = async  () => {
        const currentPokemon = await getEncounteredPokemon(randomPokemon(pokemonList))
        setEncounteredPokemon(currentPokemon)
      }

      fetchData();
      setTimeout(() => {
        encounterScreenDOM.classList.add("fade-in");
      }, 500);
    } else {
      if(encounterScreenDOM.classList.contains("fade-in")){
        encounterScreenDOM.classList.remove("fade-in");
      }
    }
    // on encounter change the game screen to encounter screen
  }, [encounter])

  useEffect(()=>{
    const handleMovementWithState = handleMovement(direction, setDirection, keyNames, collisionMap, grassMap, setEncounter, encounter, inventory
      ,setInventory);
    document.addEventListener('keydown', handleMovementWithState);
    return () => {
      document.removeEventListener('keydown', handleMovementWithState);
    };
  }, [encounter, direction])

  const directionKeys = ["↑","←","↓","→"]
  const keyNames = ["ArrowUp","ArrowLeft", "ArrowDown", "ArrowRight"]
  const actionKeys = ["z", "x"]

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

  useEffect(()=>{
    const gameScreen = document.querySelector(".game")
    if(encounter){
      setTimeout(() => {
        gameScreen.classList.add("fade-out")
      }, 2000);
    } else {
      gameScreen.classList.remove("fade-out")
    }
  },[encounter])

  const safariMap = (
  <div className="game d-flex">
    <img src="/bg-map.png" id="game-backdrop"alt="" />
    <div className="game-window p-5" style={backgroundStyle}>
      <img src="/game-map.png" alt="" />
    </div>
      <Player direction = {direction.direction} />
  </div>
  )

  return (
    <>
      <div className="background-color">
        <div className="game-container">
          {safariMap}
          <EncounterScreen
            encounteredPokemon = {encounteredPokemon}
            setEncounter = {setEncounter}
            setEncounteredPokemon = {setEncounteredPokemon}
            setCaughtPokemonList = {setCaughtPokemonList}
            inventory = {inventory}
            setInventory = {setInventory}
            setLoading = {setLoading}
            loading = {loading}
          />
          <Loading
            encounter = {encounter}
          />
        </div>
        <Key
          directionKeys = {directionKeys}
          keyNames = {keyNames}
          actionKeys = {actionKeys}
        />
      </div>
    </>
  )
}

export default App
