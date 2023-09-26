import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

import {PlayerThrowing} from "../Player/Player"
import "./Encounter.scss"
import Pokemon from "../../js/Pokemon.js"
import CaughtPokemon from "../../js/Pokemon.js"


const shinyChance = 5 // out of 100
const runChance = 75 //out of 100
const pokemonMinimumLevel = 20 // out of 100
// const maxCatchChance = 400 // max chance
const maxCatchChance = 1 // test max chance

const maxLevelModifier = 0.5 // out of 1 (50% difference)
const actionIntervals = 2000 // seconds between actions
export default function EncounterScreen(props) {

  // deconstruct object
  const { encounteredPokemon, setEncounter, setEncounteredPokemon, setCaughtPokemonList} = props
  const {name, sprites, types, weight} = encounteredPokemon
  let base_experience = encounteredPokemon.base_experience || 255

  const [caught, setCaught] = useState(false)

  //shiny logic
  const [isShiny , setIsShiny] = useState(Math.floor(Math.random() * 100) < shinyChance )
  useEffect(() => {
    setIsShiny(Math.floor(Math.random() * 100) < shinyChance)
    setCaught(false)
  }, [encounteredPokemon])

  //pokemon logic

  const [pokemonLevel, setPokemonLevel] = useState(pokemonMinimumLevel + Math.floor(Math.random() * 80))
  const pokemonName = encounteredPokemon && name.split("-")[0]

  useEffect(() => {
    setPokemonLevel(pokemonMinimumLevel + Math.floor(Math.random() * 80))
  }, [encounteredPokemon])

  const normalSprite = {
    front: sprites?.front_default,
    back: sprites?.back_default
  }

  const shinySprite = {
    front: sprites?.front_shiny,
    back: sprites?.back_shiny
  }

  //system messages
  const messages = {
    default: "What would you like to do?",
    encounter: `You encountered a ${pokemonName}!`,
    berry: `You used a berry, ${pokemonName} is now easier to catch`,
    throw: "you throw a pokeball",
    caught: `You caught a ${isShiny ? "shiny" : ""} ${pokemonName}`,
    failed: "Darn, so close!",
    failedRun: `${pokemonName} blocked your escape!`
  }

  const [systemMessage, setSystemMessage] = useState(messages.encounter)

  useEffect(() => {
    setSystemMessage(messages.encounter)
  }, [encounteredPokemon])

  //capture logic
  const [throwing, setThrowing] = useState(false)

   const setThrow = async () => {

    if(!throwing && !caught){
      setThrowing(true)
      const playerThrowing = document.querySelector("#player-throwing")

      setSystemMessage(messages.throw)
      playerThrowing.classList.add("throw")

      const wasCaught = isCaught();
      setCaught(wasCaught);

      await setTimeout(() => {
        if(wasCaught){
          setTimeout(()=>{
            const caughtPokemon = new CaughtPokemon(nanoid(), pokemonName, isShiny ? shinySprite.front : normalSprite.front, pokemonLevel, isShiny);
            setCaughtPokemonList(prevState => [...prevState, caughtPokemon]);
            setSystemMessage(messages.caught);
            setTimeout(() => {
              clearEncounter();
            }, actionIntervals * 2);
          }, actionIntervals)
        } else {
            setSystemMessage(messages.failed);
            setTimeout(() => {
                setSystemMessage(messages.default);
            }, actionIntervals);
        }
      }, actionIntervals);

      setTimeout(() => {
          setThrowing(false);
          playerThrowing.classList.remove("throw");
      }, actionIntervals / 2);
    }
  }

  const isCaught = () => {
    const levelAdjuster = ((pokemonLevel / 100) * maxLevelModifier) + 1
    const attempt =  Math.floor(Math.random() * maxCatchChance)
    return attempt > base_experience * levelAdjuster
  }

  //run logic
  const run = () => {
    if(runChance > Math.floor(Math.random() * 100)){
      clearEncounter()
    } else {
      setSystemMessage(messages.failedRun)
    }
  }

  const clearEncounter = () =>{
    setEncounter(false)
    setEncounteredPokemon("")
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
                {pokemonName} Lv{pokemonLevel}
                {isShiny && <span><img src="./sparkle.svg" className="shiny-icon" alt="" /></span>}
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
          <div className="system-message rounded col-6 p-3 d-flex justify-content-left align-items-center">
            {systemMessage}
          </div>
          <div className="inferface-container col-6">
            <div className="button rounded" onClick={setThrow}>Capture</div>
            <div className="button rounded">Items</div>
            <div className="button rounded">Pokeball</div>
            <div className="button rounded" onClick={run}>Run</div>
          </div>
        </div>
      </div>
    </>
  )
}
