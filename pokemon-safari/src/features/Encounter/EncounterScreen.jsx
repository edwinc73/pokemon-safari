import React, { useEffect, useState } from 'react'
import {PlayerThrowing} from "../Player/Player"
import "./Encounter.scss"

const shinyChance = 5 // out of 100
export default function EncounterScreen(props) {

  // deconstruct object
  const { encounteredPokemon, setEncounter, setEncounteredPokemon} = props
  const {name, base_experience, sprites, types, weight} = encounteredPokemon

  //shiny logic
  const [isShiny , setIsShiny] = useState(Math.floor(Math.random() * 100) < shinyChance )
  useEffect(() => {
    setIsShiny(Math.floor(Math.random() * 100) < shinyChance)
  }, [encounteredPokemon])

  //pokemon logic
  const pokemonName = () => {
    return encounteredPokemon && name.split("-")[0]
  }

  const normalSprite = {
    front: sprites?.front_default,
    back: sprites?.back_default
  }

  const shinySprite = {
    front: sprites?.front_shiny,
    back: sprites?.back_shiny
  }

  if(encounteredPokemon){
    console.log(isShiny)
  }

  const run = () => {
    setEncounter(false)
    setEncounteredPokemon("")
  }

  //capture logic
  const setThrow = () => {
    const playerThrowing = document.querySelector("#player-throwing")
    playerThrowing.classList.add("throw")
    setTimeout(() => {
      playerThrowing.classList.remove("throw")
    }, 1000);
  }

  const pokemonImageStyle = {
    backgroundImage : `url(${isShiny ? shinySprite.front : normalSprite.front})`
  }
  return (
    <>
      <div id="encounter-screen" className='game d-flex'>
        <div className="battle-section p-3">
          <div className="wild-pokemon p-3">
            <div className="img-container">
              <div id="pokemonImage" style={pokemonImageStyle}></div>
              <div className='pokemonImageShadow'></div>
            </div>
            <div className="name-tag rounded p-1">
              <div className="name">
                {pokemonName()}
              </div>
            </div>
          </div>
          <div className="player-section d-flex justify-content-center">
            <PlayerThrowing />
            <div className="name-tag rounded p-1">
              <div className="name">
                Player Name
              </div>
              <div className="items d-flex justify-content-between">
                <div className="item">
                  <img src="" alt="" /> x 1
                </div>
                <div className="item">
                  <img src="" alt="" /> x 1
                </div>
                <div className="item">
                  <img src="" alt="" /> x 1
                </div>
                <div className="item">
                  <img src="" alt="" /> x 1
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="battle-interface row w-100 p-3">
          <div className="system-message rounded col-6 p-3">
            What would you like to do?
          </div>
          <div className="inferface-container col-6">
            <div className="button rounded" onClick={setThrow}>Capture</div>
            <div className="button rounded">Item</div>
            <div className="button rounded">Pokeball</div>
            <div className="button rounded" onClick={run}>Run</div>
          </div>
        </div>
      </div>
    </>
  )
}
