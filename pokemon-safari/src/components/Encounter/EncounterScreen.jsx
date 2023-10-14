import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import "./EncounterScreen.scss"

import config from '../../constants/config'

import InventoryInterface from '../InventoryInterface/InventoryInterface'

import { selectBagWindow, selectEncounter, selectInventory, selectPokemonEncounter, selectSystemMessage, selectCurrentItemIndex, selectCurrentPokeball, selectCurrentBait, selectCurrentInterfaceIndex, selectThrown, selectUseBait } from "../../selectors/selectors"
import updateInventory from '../../customHook/updateInventory'
import navigateInterface from '../../customHook/navigateInterface'
import useCapture from '../../customHook/useCapture'
import { ACTIVE_BAIT, CURRENT_BAIT, CURRENT_POKEBALL, INTERFACE_INDEX, SELECT_ITEM_INDEX, SET_LOADING, SYSTEM_MESSAGE } from "../../actions/actionsCreator"

import {PlayerThrowing} from "../Player/Player"
import { findItem, hasItem } from '../../js/inventory'
import { setCurrentInterfaceIndex } from '../../reducers/gameSystemReducers'
import messages from '../../js/systemMessages'

let lastMoveTime = 0;

export default function EncounterScreen(props) {
  const dispatch = useDispatch()
  const { capture } = useCapture()
  const {useItem, foundItem} = updateInventory()
  const { handleInterfaceKeyDown } = navigateInterface()

  const inventory = useSelector(selectInventory)
  const encounter = useSelector(selectEncounter)
  const pokemon = useSelector(selectPokemonEncounter)
  const bagWindow = useSelector(selectBagWindow)
  const systemMessage = useSelector(selectSystemMessage)
  const itemIndex = useSelector(selectCurrentItemIndex)
  const currentPokeball = useSelector(selectCurrentPokeball)
  const currentBait = useSelector(selectCurrentBait)
  const currentInterfaceIndex = useSelector(selectCurrentInterfaceIndex)
  const thrown = useSelector(selectThrown)
  const useBait = useSelector(selectUseBait)

  //      style
  const encounterStyle = {
    opacity: encounter ? 1 : 0
  }

  const pokemonImageStyle = {
    backgroundImage : `url(${pokemon.sprite})`
  }

  useEffect(() => {
    pokemon && dispatch(SYSTEM_MESSAGE(messages(pokemon).encounter))
  },[pokemon])

  useEffect(() => {
    if(encounter){
      dispatch(SELECT_ITEM_INDEX(0))
      dispatch(INTERFACE_INDEX(0))
      dispatch(INTERFACE_INDEX(0))
      dispatch(ACTIVE_BAIT(false))
    }

    const loadImage = async () => {
      if(encounter){
        const image = new Image
        image.src = pokemon.sprite

        await new Promise((res)=> {
          image.onload = res
          setTimeout(() => {
            dispatch(SET_LOADING(false))
          }, 2000);
        })
      }
    }
    loadImage()
  }, [encounter])

  useEffect(()=>{
    dispatch(CURRENT_POKEBALL(findItem(inventory, currentPokeball.name)))
    dispatch(CURRENT_BAIT(findItem(inventory, currentBait.name)))
  }, [inventory])

  useEffect(()=> {
    if (new Date().getTime() - lastMoveTime < config.debounceTime) {
      return;
    } else {
      thrown && capture()
    }
    lastMoveTime = new Date().getTime()
  }, [thrown])


  useEffect(() => {
    //      animate berry use
    const pokemonImage = document.querySelector("#pokemonImage")
    const nameTag = document.querySelector(".wild-pokemon>.name-tag")
    if(useBait){
      const image = new Image
      const berryImage = currentBait.name == "berry" ? "/berry/RazzBerry.png" : "/berry/NanabBerry.png"
      image.src = berryImage
      image.id = "pokemon-img"
      image.style.width = "42px"
      image.style.height = "42px"
      nameTag.appendChild(image)

      const berryFadeImage = new Image
      berryFadeImage.src = berryImage
      berryFadeImage.style.width = "100px"
      berryFadeImage.style.height = "100px"

      berryFadeImage.classList.add("berryFadeAnimation")
      setTimeout(() => {
        pokemonImage.removeChild(document.querySelector(".berryFadeAnimation"))
      }, 3000);
      pokemonImage.appendChild(berryFadeImage)
    } else {
      const domImage = document.querySelector(".wild-pokemon #pokemon-img")
      nameTag.contains(domImage) && nameTag.removeChild(domImage)
    }
  }, [useBait])



  useEffect(()=>{
    if (pokemon) {
      const interfaceButtons = document.querySelectorAll(".inferface-container")[0].childNodes;
      interfaceButtons.forEach(button => {
        button.classList.contains("active") && button.classList.remove("active");
      });
      interfaceButtons[currentInterfaceIndex].classList.add("active");
    }
  },[pokemon, currentInterfaceIndex])

  useEffect(() => {
    document.addEventListener("keydown", handleInterfaceKeyDown);
    return () => {
      document.removeEventListener("keydown", handleInterfaceKeyDown);
    };
  }, [encounter, pokemon, bagWindow, currentInterfaceIndex]);



  // useEffect(() => {
  //   setSystemMessage(messages.encounter)
  // }, [encounteredPokemon])

  // //capture logic
  // const [throwing, setThrowing] = useState(false)
  // const [caught, setCaught] = useState(false)

  // // catching

  // const setThrow = async () => {
  //   // check if inventory has pokeball
  //   if(!throwing && !caught && hasItem(currentPokeball)){
  //     await setThrowing(true)
  //     await updateInventory(currentPokeball, "pokeballs", "remove")
  //   }
  // }

  // // styles

  // const [berryImage, setBerryImage] = useState(`/berry/RazzBerry.png`)

  // useEffect(()=>{
  //   const setStyle = async () => {
  //     if(currentBait == "berry"){
  //       await setBerryImage("/berry/RazzBerry.png")
  //     } else if (currentBait == "banana"){
  //       await setBerryImage("/berry/NanabBerry.png")
  //     }
  //   }

  //   setStyle()
  // }, [currentBait, currentPokeball])

  const berryStyle = {
    opacity: useBait && hasItem(currentBait) ? 1 : 0.2
  }


  return (
    <>
      <div id="encounter-screen" style={encounterStyle}className='game d-flex'>
        <div className="battle-section p-3">
          <div className="wild-pokemon p-3">
            <div className="img-container">
              <div id="pokemonImage" className="d-flex justify-content-center align-items-center" style={pokemonImageStyle}></div>
              <div id="pokemonBallAnimation" className=''> </div>
              <div className='pokemonImageShadow'></div>
            </div>
            <div className="name-tag rounded p-1 d-flex">
              <div className="name">
                {pokemon.name} Lv{pokemon.level}
                {pokemon.shiny && <span><img src="./sparkle.svg" className="shiny-icon" alt="" /></span>}
              </div>
            </div>
          </div>
          <div className="player-section d-flex justify-content-center">
            <PlayerThrowing />
            <div className="ball-container"></div>
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
          <div className="inventory-overlay w-100 d-flex justify-content-center align-items-center">
            {bagWindow && <InventoryInterface />}
          </div>
        </div>
        <div className="battle-interface row w-100 p-3">
          <div className="system-message rounded col-6 p-3 d-flex justify-content-left align-items-center">
            {systemMessage}
          </div>
          <div className="inferface-container col-6">
            <div className="button rounded"><img className="interface-pokeball-image" src={`/pokeballs/${currentPokeball?.name}/idle.png`} /><h2>Capture</h2></div>

            <div className="button rounded"><img className="interface-pokeball-image" src={`/berry/${currentBait?.name == "berry" ? "RazzBerry.png" : "NanabBerry.png"}`} style={berryStyle} /><h2>Berry</h2></div>
            <div className="button rounded"><img className="interface-pokeball-image interface-image-large" src="/bag.png" /><h2>Bag</h2></div>
            <div className="button rounded"><img className="interface-pokeball-image" src="/run.png" /><h2>Run</h2></div>

          </div>
        </div>
      </div>
    </>
  )
}

// set running logic and animation

//add random items on the map

// add lazy loading and a loading screen to make sure the images are loaded in before the user sees it
