import React, { useEffect, useState } from 'react'
import { nanoid, random } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPokemon, selectCollisionCoord, selectEncounter, selectPosition, selectInventory, selectLoading, selectPokemonList, selectMapItemList, selectLatestMapItem, selectShowPopUp } from './selectors/selectors'
import config  from "./constants/config.js";

import './App.scss'

import {Player} from "../src/components/Player/Player"
import Popup from './components/Popup/Popup';
import useMovement from "./customHook/useMovement"
import EncounterScreen from "./components/Encounter/EncounterScreen"
import { getEncounteredPokemon, randomPokemon, pokemonName, isShiny, setPokemonLevel } from './js/encounter';

import Loading from "../src/components/Loading/Loading"

//      redux
import store from "./store/index"
import {SET_LOADING, SET_COLLISION, SET_GRASS, SET_POSITION, SET_ENCOUNTER, ADD_POKEMON, NEW_POKEMON, ADD_ITEM, REMOVE_ITEM, FETCH_ALL_POKEMON_DATA, CURRENT_POKEBALL, CURRENT_BAIT, SET_BAGWINDOW, SYSTEM_MESSAGE, SET_SCORE, SET_MAP_ITEMS_LIST, FOUND_MAP_ITEM, SET_LATEST_MAP_ITEM, SET_SHOW_POPUP} from "./actions/actionsCreator"

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
  const mapItemList = useSelector(selectMapItemList)
  const latestMapItem = useSelector(selectLatestMapItem)
  const showPopup = useSelector(selectShowPopUp)
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
    dispatch(SET_SHOW_POPUP(false))
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

  useEffect(()=>{

    const currentCoord = {
      x: Math.ceil((backgroundSize.width - position.movementValue.x - 3970) / config.squareValue) + 1,
      y: Math.ceil((backgroundSize.height - position.movementValue.y - 1902) / config.squareValue) + 1
    }
    const item = mapItemList.find(item => {
      return item.x == currentCoord.x && item.y == currentCoord.y
    })

    if(item) {
      dispatch(ADD_ITEM(item.item))
      dispatch(SET_LATEST_MAP_ITEM(item.item))
      dispatch(FOUND_MAP_ITEM(item))
      dispatch(SET_SHOW_POPUP(true))
      const popUp = document.querySelector(".popup")
      popUp.classList.add("show")
    }
  },[position])

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
          <Popup
          item ={latestMapItem}
          />
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
