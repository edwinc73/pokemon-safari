import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPokemon, selectCollisionCoord, selectPosition } from './selectors/selectors'
import config  from "./constants/config.js";

import './App.scss'

// import Key from "../src/features/Key/Key"
import {Player} from "../src/components/Player/Player"
import useMovement from "./customHook/useMovement"
// import {getPokemonData, randomPokemon} from "./js/encounter"
// import {mapCoord} from "./js/mapCoord.js"
// import EncounterScreen from "./features/Encounter/EncounterScreen"
// import { getEncounteredPokemon } from "../src/js/encounter.js";
// import Loading from "../src/features/Loading/Loading"



//redux
import store from "./store/index"
import {SET_LOADING, SET_COLLISION, SET_GRASS, SET_POSITION, SET_ENCOUNTER, ADD_POKEMON, NEW_POKEMON, ADD_ITEM, REMOVE_ITEM, FETCH_ALL_POKEMON_DATA} from "./actions/actionsCreator"

import { collision } from "../data/collision-map"
import { grass } from "../data/grass-map.js"

function App() {
  const dispatch  = useDispatch()
  const { backgroundSize } = config
  const { handleMovement } = useMovement()

  useEffect(()=>{
    //      initialize map
    dispatch(SET_COLLISION(collision))
    dispatch(SET_GRASS(grass))
    dispatch(SET_ENCOUNTER(false))
    dispatch(NEW_POKEMON(1, "bob", true, "url", 100))
    dispatch(ADD_ITEM("berry"))
    dispatch(ADD_ITEM("pokeball"))
    dispatch(ADD_ITEM("pokeball"))
    dispatch(REMOVE_ITEM("pokeball"))
    dispatch(FETCH_ALL_POKEMON_DATA())
  }, [])


  //      Get all states from store
  const allPokemonData = useSelector(selectAllPokemon)
  const position = useSelector(selectPosition)
  const collisionCoord = useSelector(selectCollisionCoord)


  useEffect(()=>{
    if (!collisionCoord) return;

    document.addEventListener('keydown', handleMovement);
    return () => {
      document.removeEventListener('keydown', handleMovement);
    };
  }, [collisionCoord])

  //   // loading pokemon in encounter screen

  //   useEffect(() => {
//     if(encounter){
//       setLoading(true)
//     }
//   }, [encounter, encounteredPokemon])

//   // loading screen fade in

//   useEffect(()=> {
//     if(encounter){
//       const loadingScreen = document.querySelector(".loading")
//       loadingScreen.classList.add("loading-fade-in")
//     }
//   }, [encounter])


//   // movement logic
//   useEffect(()=>{
//     setDirection({
//       direction: "walk-down",
//       movementValue:{
//         x: parseFloat(document.querySelector(".game-window").style.left) || 0,
//         y: parseFloat(document.querySelector(".game-window").style.top) || 0
//       }
//     })
//   }, [])

//   useEffect(()=>{
//     const encounterScreenDOM = document.querySelector("#encounter-screen")
//     if(encounter){
//       const fetchData = async  () => {
//         const currentPokemon = await getEncounteredPokemon(randomPokemon(pokemonList))
//         setEncounteredPokemon(currentPokemon)
//       }

//       fetchData();
//       setTimeout(() => {
//         encounterScreenDOM.classList.add("fade-in");
//       }, 500);
//     } else {
//       if(encounterScreenDOM.classList.contains("fade-in")){
//         encounterScreenDOM.classList.remove("fade-in");
//       }
//     }
//     // on encounter change the game screen to encounter screen
//   }, [encounter])

//   useEffect(()=>{
//     const handleMovementWithState = handleMovement(direction, setDirection, keyNames, collisionMap, grassMap, setEncounter, encounter, inventory
//       ,setInventory);
//     document.addEventListener('keydown', handleMovementWithState);
//     return () => {
//       document.removeEventListener('keydown', handleMovementWithState);
//     };
//   }, [encounter, direction])

//   const directionKeys = ["↑","←","↓","→"]
//   const keyNames = ["ArrowUp","ArrowLeft", "ArrowDown", "ArrowRight"]
//   const actionKeys = ["z", "x"]


  const backgroundStyle ={
    top: `${position.movementValue.y}px`,
    left: `${position.movementValue.x}px`,
    width: `${backgroundSize.width}px`,
    height: ` ${backgroundSize.height}px`
  }

//   useEffect(()=>{
//     const gameScreen = document.querySelector(".game")
//     if(encounter){
//       setTimeout(() => {
//         gameScreen.classList.add("fade-out")
//       }, 2000);
//     } else {
//       gameScreen.classList.remove("fade-out")
//     }
//   },[encounter])

  const safariMap = (
  <div className="game d-flex">
    <img src="/bg-map.png" id="game-backdrop"alt="" />
    <div className="game-window p-5" style={backgroundStyle}>
      <img src="/game-map.png" alt="" />
    </div>
      <Player direction = {position.direction} />
  </div>
  )

  return (
    <>
      <div className="background-color">
        <div className="game-container">
          {safariMap}
          {/* <EncounterScreen
            encounteredPokemon = {encounteredPokemon}
            setEncounter = {setEncounter}
            setEncounteredPokemon = {setEncounteredPokemon}
            setCaughtPokemonList = {setCaughtPokemonList}
            inventory = {inventory}
            setInventory = {setInventory}
            setLoading = {setLoading}
            loading = {loading}
          /> */}
          {/* <Loading
            encounter = {encounter}
          /> */}
        </div>
        {/* <Key
          directionKeys = {directionKeys}
          keyNames = {keyNames}
          actionKeys = {actionKeys}
        /> */}
      </div>
    </>
  )
}

export default App
