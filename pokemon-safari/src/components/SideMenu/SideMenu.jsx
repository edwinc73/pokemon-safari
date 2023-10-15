import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import "./SideMenu.scss"

import config from '../../constants//config.js'

import InventoryInterface from '../InventoryInterface/InventoryInterface'

import { selectInventory, selectPokemonList, selectScore, selectStart } from "../../selectors/selectors"

import { findItem, hasItem } from '../../js/inventory'

export default function SideMenu () {

  const start  = useSelector(selectStart)
  const pokemonList = useSelector(selectPokemonList)
  const score = useSelector(selectScore)

  const [seconds, setSeconds] = useState(0);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }


  useEffect(() => {
    if(start){
      const intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [])

  const renderPokemonList = pokemonList.map(pokemon => {

    const {name, shiny, sprite, level, id} = pokemon

    return(
      <>
        <div className="pokemon d-flex flex-column align-items-center" key={id}>
          <img className="sprite" src={sprite} />
          <p>{name}</p>
          <div className='pokemon-description d-flex justify-content-center align-items-center'>
            <p>lv: {level}</p>
            {shiny && <span><img src="./sparkle.svg" className="shiny-icon" alt="" /></span> }
          </div>
        </div>
      </>
    )
  })


  return (
    <>
      <div className="sidemenu text-bg-light d-flex flex-column align-items-center">
        <div className="timer-container d-flex justify-content-center align-items-center sidemenu-container">
          {formatTime(seconds)}
        </div>
        <div className="pokemon-list-container sidemenu-container d-flex flex-column align-items-center">
          Pokemon list:
          <div className="pokemon-list">
            {renderPokemonList}
          </div>
        </div>
        <div className="score-container timer-container d-flex justify-content-center align-items-center">
          Score: {score}
        </div>
      </div>
    </>
  )
}
