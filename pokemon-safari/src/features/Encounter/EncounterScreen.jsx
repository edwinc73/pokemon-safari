import React, { useEffect, useState } from 'react'
import {PlayerThrowing} from "../Player/Player"
import "./Encounter.scss"

const shinyChance = 5 // out of 100
export default function EncounterScreen(props) {

  const [isShiny , setIsShiny] = useState(()=> Math.floor((Math.random() * 100) + 1)< shinyChance )
  const { encounteredPokemon } = props
  // deconstructe object
  const {name, base_experience, sprites, types, weight} = encounteredPokemon

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
    console.log(encounteredPokemon)
    console.log(normalSprite)
    console.log(isShiny)
  }

  //capture logic
  const setThrow = () => {
    const playerThrowing = document.querySelector("#player-throwing")
    playerThrowing.classList.add("throw")
    setTimeout(() => {
      playerThrowing.classList.remove("throw")
    }, 1000);
  }

  return (
    <>
      <div id="encounter-screen" className='game d-flex'>
        <div className="battle-section p-3">
          <div className="wild-pokemon">
            <div className="img-container">
              <img src={isShiny ? shinySprite.front : normalSprite.front} alt="" />
            </div>
            <div className="name-tag">
              <div className="name">
                {pokemonName()}
              </div>
            </div>
          </div>
          <div className="player-section">
            <PlayerThrowing />
            <div className="name-tag">
            <div className="name">
              Player Name
            </div>
            <div className="items">
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
            <div className="button rounded">Run</div>
          </div>
        </div>
      </div>
    </>
  )
}
