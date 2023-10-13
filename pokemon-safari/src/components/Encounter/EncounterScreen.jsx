import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import "./EncounterScreen.scss"

import config from '../../constants/config'

import InventoryInterface from '../InventoryInterface'

import { selectBagWindow, selectEncounter, selectInventory, selectPokemonEncounter, selectSystemMessage, selectCurrentItemIndex, selectCurrentPokeball, selectCurrentBait, selectCurrentInterfaceIndex } from "../../selectors/selectors"
import updateInventory from '../../customHook/updateInventory'
import navigateInterface from '../../customHook/navigateInterface'
import { INTERFACE_INDEX, SELECT_ITEM_INDEX, SET_LOADING } from "../../actions/actionsCreator"

import {PlayerThrowing} from "../Player/Player"
import { hasItem } from '../../js/inventory'
import { setCurrentInterfaceIndex } from '../../reducers/gameSystemReducers'

let lastMoveTime = 0;

export default function EncounterScreen(props) {
  const dispatch = useDispatch()
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


  //      style
  const encounterStyle = {
    opacity: encounter ? 1 : 0
  }

  const pokemonImageStyle = {
    backgroundImage : `url(${pokemon.sprite})`
  }

  useEffect(() => {
    dispatch(SELECT_ITEM_INDEX(0))
    dispatch(INTERFACE_INDEX(0))
  },[pokemon])

  useEffect(() => {
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

  // useEffect(() => {
  //   if (bagWindow) {
  //     const items = document.querySelectorAll(".inventory>.item")
  //     // remove active
  //     items.forEach(item => {
  //       if(item.classList.contains("active")){
  //         item.classList.remove("active")
  //       }
  //     })
  //     // add active
  //     items[itemIndex].classList.add("active")
  //   }
  // }, [bagWindow, itemIndex])

  // useEffect(() => {
  //   const navigateInventory = async (e) => {
  //     const pokeballs = Object.keys(inventory.pokeballs)
  //     const baits = inventory.baits
  //     if(bagWindow){
  //       switch (e.key) {
  //         case "ArrowDown":
  //           await setCurrentItemIndex(prev => prev + 1 > 5 ? 5 : prev + 1)
  //         break;
  //         case "ArrowUp":
  //           await setCurrentItemIndex(prev => prev - 1 < 0 ? 0 : prev - 1)
  //         break;
  //         case "x":
  //           await closeBag()
  //         break;
  //         case "z":
  //           if(currentItemIndex < 3){
  //             await setCurrentPokeball(inventory.pokeballs[pokeballs[currentItemIndex]])
  //             await closeBag()
  //           } else {
  //             if(currentItemIndex == 4){
  //               await setCurrentBait(baits.berry)
  //             } else {
  //               await setCurrentBait(baits.banana)
  //             }
  //             await closeBag()
  //           }
  //           break;
  //         default:
  //         break;
  //       }
  //     }
  //   }

  //   document.addEventListener("keydown", navigateInventory)
  //   return () => {
  //     document.removeEventListener("keydown", navigateInventory)

  //   };
  // },[bagWindow, inventory, currentItemIndex, closeBag])

  // // system interface navigation


  useEffect(()=> {
    dispatch(INTERFACE_INDEX(0))
  },[encounter])

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
    document.addEventListener("keyup", handleInterfaceKeyDown);
    return () => {
      document.removeEventListener("keyup", handleInterfaceKeyDown);
    };
  }, [encounter, pokemon, bagWindow, lastMoveTime, currentInterfaceIndex]);

  // const [systemMessage, setSystemMessage] = useState(messages.encounter)

  // useEffect(() => {
  //   setSystemMessage(messages.encounter)
  // }, [encounteredPokemon])

  // //capture logic
  // const [throwing, setThrowing] = useState(false)
  // const [caught, setCaught] = useState(false)

  // useEffect(() => {
  //   setCaught(false)
  // }, [encounteredPokemon])

  // const isCaught = () => {
  //   const pokeballValue = currentPokeball.value
  //   const levelAdjuster = ((pokemonLevel / 100) * maxLevelModifier) + 1
  //   const attempt =  Math.floor(Math.random() * maxCatchChance)
  //   return attempt + pokeballValue > base_experience * levelAdjuster
  // }

  // const flashAnimation = (node) => {
  //   node.classList.add("flash")
  //   setTimeout(() => {
  //     node.classList.remove("flash")
  //   }, 1500);
  // }

  // // catching

  // const setThrow = async () => {
  //   // check if inventory has pokeball
  //   if(!throwing && !caught && hasItem(currentPokeball)){
  //     await setThrowing(true)
  //     await updateInventory(currentPokeball, "pokeballs", "remove")
  //   }
  // }

  // useEffect(() => {
  //   const pokemonImage = document.querySelector("#pokemonImage")
  //   const pokeballName = currentPokeball.name

  //   const setPokeBallImage =  (element, action) => {
  //     element.classList.add(`catching${action ? "-"+action : ""}`)
  //     element.style.backgroundImage = `url("/pokeballs/${pokeballName}/${action ? action[0].toUpperCase() + action.slice(1) : "Catching"}.png")`
  //   }
  //   if(throwing){
  //     const playerThrowing = document.querySelector("#player-throwing")
  //     const ballContainer = document.querySelector(".ball-container")
  //     const pokemonBallAnimation = document.querySelector("#pokemonBallAnimation")

  //     setSystemMessage(messages.throw)
  //     playerThrowing.classList.add("throw")

  //     ballContainer.classList.add("ball-animation")
  //     ballContainer.style.backgroundImage = `url("/pokeballs/${pokeballName}/Throwing.png")`

  //     const wasCaught = isCaught();
  //     setCaught(wasCaught);

  //     const maxCatchingTime = 2000 + 2000/3

  //     const randomCatchingTime = () => {
  //       let randomTime = Math.random()
  //       if(wasCaught){
  //         return randomTime > 0.9 ? 2000 / 3 : maxCatchingTime
  //       }

  //       if(randomTime > 0.8){
  //         return 500
  //       } else if (randomTime > 0.65){
  //         return 2000 / 3
  //       } else if (randomTime > 0.3){
  //         return 2000 / 3 * 2
  //       } else {
  //         return maxCatchingTime
  //       }
  //     }

  //     const randTime = randomCatchingTime()

  //     setTimeout(() => {
  //       if(wasCaught){
  //         setTimeout(()=>{
  //           const caughtPokemon = new CaughtPokemon(nanoid(), pokemonName, isShiny ? shinySprite.front : normalSprite.front, pokemonLevel, isShiny);
  //           setCaughtPokemonList(prevState => [...prevState, caughtPokemon]);
  //           setSystemMessage(messages.caught);
  //           setTimeout(() => {
  //             pokemonBallAnimation?.classList.remove("catching-success")
  //             clearEncounter();
  //           }, 3000);
  //         }, randTime)
  //       } else {
  //           setSystemMessage(messages.failed);
  //           setTimeout(() => {
  //               setSystemMessage(messages.default);
  //           }, randTime);
  //       }
  //     }, randTime);

  //     setTimeout(() => {
  //       ballContainer.classList.remove("ball-animation")
  //       flashAnimation(pokemonImage)
  //       pokemonImage.classList.add("unshow")
  //       setPokeBallImage(pokemonBallAnimation, "")
  //       setTimeout(() => {
  //         if(wasCaught){
  //           setPokeBallImage(pokemonBallAnimation, "success")
  //         } else {
  //           setPokeBallImage(pokemonBallAnimation, "fail")
  //           setTimeout(() => {
  //             pokemonBallAnimation.classList.remove("catching-fail")
  //             flashAnimation(pokemonImage)
  //             pokemonImage.classList.remove("unshow")
  //           }, 500);
  //         }
  //         pokemonBallAnimation.classList.remove("catching")
  //       }, randTime);
  //     }, 925);

  //     setTimeout(() => {
  //         setThrowing(false);
  //         playerThrowing.classList.remove("throw");
  //         setUseBerry(false)
  //     }, randTime + 930 + 500 + 2000);
  //   }
  // }, [throwing])


  // // using berry

  // const [berryValue, setBerryValue] = useState(0)
  // const [useBerry, setUseBerry] = useState(false)

  // useEffect(()=>{
  //   if(currentBait != ""){
  //     setBerryValue(currentBait.value)
  //   } else {
  //     setBerryValue(0)
  //   }
  // }, [currentBait, throwing])

  // //use Berry

  // useEffect(()=>{
  //   const pokemonImage = document.querySelector("#pokemonImage")
  //   const nameTag = document.querySelector(".wild-pokemon>.name-tag")

  //   if(useBerry){
  //     const image = new Image
  //     image.src = berryImage
  //     image.id = "pokemon-img"
  //     image.style.width = "42px"
  //     image.style.height = "42px"
  //     nameTag.appendChild(image)

  //     const berryFadeImage = new Image
  //     berryFadeImage.src = berryImage
  //     berryFadeImage.style.width = "100px"
  //     berryFadeImage.style.height = "100px"

  //     berryFadeImage.classList.add("berryFadeAnimation")
  //     setTimeout(() => {
  //       pokemonImage.removeChild(document.querySelector(".berryFadeAnimation"))
  //     }, 3000);

  //     pokemonImage.appendChild(berryFadeImage)
  //     updateInventory (currentBait, "baits", "remove")
  //   } else {
  //     const domImage = document.querySelector(".wild-pokemon #pokemon-img")
  //     if(nameTag.contains(domImage)){
  //       nameTag.removeChild(domImage)
  //     }
  //   }
  // }, [useBerry])

  // //run logic
  // const run = () => {
  //   if(runChance > Math.floor(Math.random() * 100)){
  //     clearEncounter()
  //   } else {
  //     setSystemMessage(messages.failedRun)
  //   }
  // }

  // const clearEncounter = () =>{
  //   setEncounter(false)
  //   setEncounteredPokemon("");
  //   setBagWindow(false)
  //   setBerry(false)
  //   setBerryImage("/berry/RazzBerry.png")
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

  // const berryStyle = {
  //   opacity: useBerry ? 1 : 0.2
  // }


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
            {/* <div className="button rounded"><img className="interface-pokeball-image" src={`/pokeballs/${currentPokeball.name}/idle.png`} /><h2>Capture</h2></div> */}
            <div className="button rounded"><img className="interface-pokeball-image" /><h2>Capture</h2></div>

            {/* <div className="button rounded"><img className="interface-pokeball-image" src={berryImage} style={berryStyle} /><h2>Berry</h2></div> */}
            <div className="button rounded"><img className="interface-pokeball-image" /><h2>Berry</h2></div>

            <div className="button rounded"><img className="interface-pokeball-image interface-image-large" src="/bag.png" /><h2>Bag</h2></div>
            {/* <div className="button rounded" onClick={run}><img className="interface-pokeball-image" src="/run.png" /><h2>Run</h2></div> */}
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
