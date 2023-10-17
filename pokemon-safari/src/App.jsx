import React, { useEffect, useState } from 'react'
import { nanoid, random } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPokemon, selectCollisionCoord, selectEncounter, selectPosition, selectInventory, selectLoading, selectPokemonList } from './selectors/selectors'
import config  from "./constants/config.js";

import './App.scss'

import {Player} from "../src/components/Player/Player"
import useMovement from "./customHook/useMovement"
import EncounterScreen from "./components/Encounter/EncounterScreen"
import { getEncounteredPokemon, randomPokemon, pokemonName, isShiny, setPokemonLevel } from './js/encounter';

import Loading from "../src/components/Loading/Loading"

//      redux
import store from "./store/index"
import {SET_LOADING, SET_COLLISION, SET_GRASS, SET_POSITION, SET_ENCOUNTER, ADD_POKEMON, NEW_POKEMON, ADD_ITEM, REMOVE_ITEM, FETCH_ALL_POKEMON_DATA, CURRENT_POKEBALL, CURRENT_BAIT, SET_BAGWINDOW, SYSTEM_MESSAGE, SET_SCORE, SET_MAP_ITEMS_LIST} from "./actions/actionsCreator"

//      data
import { collision } from "../data/collision-map"
import { grass } from "../data/grass-map.js"
import { findItem } from './js/inventory';
import SideMenu from './components/SideMenu/SideMenu';
import Items from './components/Items/setMapItems';


function App() {
  const dispatch  = useDispatch()
  const { backgroundSize } = config
  const { handleMovement } = useMovement()

  //      Get all states from store
  const inventory = useSelector(selectInventory)
  const allPokemonData = useSelector(selectAllPokemon)
  const position = useSelector(selectPosition)
  const collisionCoord = useSelector(selectCollisionCoord)
  const encounter = useSelector(selectEncounter)
  const pokemonList = useSelector(selectPokemonList)
  // const pokemonEncounter = useSelector(selectPokemonEncounter)
  // const loading = useSelector(selectLoading)
  // const pokemon = useSelector(selectPokemonEncounter)


  useEffect(()=>{
    //      initialize map
    dispatch(SET_COLLISION(collision))
    dispatch(SET_GRASS(grass))
    dispatch(SET_ENCOUNTER(false))
    dispatch(FETCH_ALL_POKEMON_DATA())
    dispatch(SET_SCORE(0))
  }, [])

  useEffect(() => {
    let totalScore = 0
    pokemonList.forEach(pokemon => {
      const subTotal = ( pokemon.baseExperience + pokemon.level ) * (pokemon.shiny ? config.shinyBonus : 1)
      totalScore += subTotal
    });

    pokemonList.forEach(pokemon => {
      const subTotal = ( pokemon.baseExperience + pokemon.level ) * (pokemon.shiny ? config.shinyBonus : 1)
      totalScore += subTotal
    });
    dispatch(SET_SCORE(totalScore))
  }, [pokemonList, inventory])

// test
  // setTimeout(() => {
  //   dispatch(SET_ENCOUNTER(true))
  // }, 1000);

  useEffect(()=>{
    dispatch(CURRENT_POKEBALL(findItem(inventory, "pokeball")))
    dispatch(CURRENT_BAIT(findItem(inventory, "berry")))
  }, [encounter])

  useEffect(() => {
    encounter && dispatch(SET_LOADING(true))
  }, [encounter])

  useEffect(()=>{
    if (!collisionCoord) return;

    document.addEventListener('keydown', handleMovement);
    return () => {
      document.removeEventListener('keydown', handleMovement);
    };
  }, [collisionCoord])

  useEffect(() => {
    const getData = async () => {
      if (allPokemonData.length === 0 || !encounter) return;
      try {
        const pokemonData = randomPokemon(allPokemonData)
        const {name, sprites, base_experience : baseExperience} = await getEncounteredPokemon(pokemonData)
        const shiny = isShiny()
        dispatch(NEW_POKEMON(nanoid(), pokemonName(name), shiny, shiny ? (sprites.front_shiny ? sprites.front_shiny : sprites.front_default) : sprites.front_default, setPokemonLevel(), baseExperience || 255))
      } catch (error) {
        console.error("error", error);
      }
    };
    getData()
  }, [encounter]);

  const backgroundStyle ={
    top: `${position.movementValue.y}px`,
    left: `${position.movementValue.x}px`,
    width: `${backgroundSize.width}px`,
    height: ` ${backgroundSize.height}px`
  }

  const safariMap = (
  <div className="game d-flex">
    <img src="/bg-map.png" id="game-backdrop"alt="" />
    <div className="game-window p-5" style={backgroundStyle}>
      <img src="/game-map.png" alt="" />
      <Items />
    </div>
      <Player direction = {position.direction} />
  </div>
  )

  return (
    <>
      <div className="background-color d-flex">
        <div className="game-container">
          {safariMap}
          <EncounterScreen />
          <Loading />
          <SideMenu />
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
