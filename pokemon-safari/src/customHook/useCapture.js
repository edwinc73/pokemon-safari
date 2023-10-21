import config from "../constants/config"
import { useSelector, useDispatch } from "react-redux";
import { selectBagWindow, selectCurrentBait, selectCurrentPokeball, selectEncounter, selectInventory, selectPokemonEncounter, selectShowPopUp, selectThrown, selectUseBait } from "../selectors/selectors";
import { isCaught, pokemonRan, randomCatchingTime } from "../js/encounter";
import { findItem, hasItem } from '../js/inventory'
import { ADD_POKEMON, SET_ENCOUNTER, SYSTEM_MESSAGE, THROW_POKEBALL, REMOVE_ITEM, ACTIVE_BAIT, CURRENT_POKEBALL } from "../actions/actionsCreator";
import messages from "../js/systemMessages";
import { useEffect, useRef, useState } from "react";

const useCapture = () => {
  const dispatch = useDispatch()
  const currentBait = useSelector(selectCurrentBait)
  const currentPokeball = useSelector(selectCurrentPokeball)
  const pokemon = useSelector(selectPokemonEncounter)
  const useBait = useSelector(selectUseBait)
  const showPopup = useSelector(selectShowPopUp)
  const bagWindow = useSelector(selectBagWindow)
  const encounter = useSelector(selectEncounter)
  const encounterRef = useRef(encounter)
  const showPopupRef = useRef(showPopup)
  const bagWindowRef = useRef(bagWindow)

  useEffect(()=> {
    encounterRef.current = encounter;
    showPopupRef.current = showPopup
    bagWindowRef.current = bagWindow
  }, [encounter, showPopup, bagWindow])

  const capture = () => {
    if(!encounterRef.current || showPopupRef.current || bagWindowRef.current)return;
    if(hasItem(currentPokeball)){
      dispatch(REMOVE_ITEM(currentPokeball))

      const playerThrowing = document.querySelector("#player-throwing")
      const ballContainer = document.querySelector(".ball-container")
      const pokemonBallAnimation = document.querySelector("#pokemonBallAnimation")
      const pokemonImage = document.querySelector("#pokemonImage")
      const caught = isCaught(pokemon, currentPokeball, currentBait, useBait)
      const randTime = randomCatchingTime(caught)
      playerAnimation()
      if(caught){
        dispatch(SYSTEM_MESSAGE(messages(pokemon).throw))
        setTimeout(()=>{
          dispatch(SYSTEM_MESSAGE(messages(pokemon).caught))
          setTimeout(() => {
            dispatch(ADD_POKEMON(pokemon))
            pokemonBallAnimation?.classList.remove("catching-success")
            dispatch(SET_ENCOUNTER(false))
            dispatch(THROW_POKEBALL(false))
            dispatch(ACTIVE_BAIT(false))
          }, 4000);
        }, randTime)
      } else {
        setTimeout(() => {
          dispatch(SYSTEM_MESSAGE(messages(pokemon).failed))
            if(pokemonRan(pokemon)){
              setTimeout(() => {
                flashAnimation(pokemonImage)
                dispatch(SYSTEM_MESSAGE(messages(pokemon).pokemonRun))
                setTimeout(() => {
                  runAway(pokemonImage)
                  dispatch(SET_ENCOUNTER(false))
                  dispatch(THROW_POKEBALL(false))
                  dispatch(ACTIVE_BAIT(false))
                  setTimeout(() => {
                    dispatch(SYSTEM_MESSAGE(messages(pokemon).default))
                  }, 2000);
                }, 4000);
              }, 2000);
            } else {
            setTimeout(() => {
              dispatch(SYSTEM_MESSAGE(messages(pokemon).looking))
              setTimeout(() => {
                dispatch(THROW_POKEBALL(false))
                dispatch(ACTIVE_BAIT(false))
                dispatch(SYSTEM_MESSAGE(messages(pokemon).default))
              }, 2000);
            }, 2000);
          }
        }, randTime + 500);
      }

      setTimeout(() => {
        ballContainer.classList.remove("ball-animation")
        flashAnimation(pokemonImage)
        pokemonImage.classList.add("unshow")
        setPokeBallImage(pokemonBallAnimation, "")
        setTimeout(() => {
          if(caught){
            pokemonBallAnimation.classList = ""
            setPokeBallImage(pokemonBallAnimation, "success")
            setTimeout(() => {
              pokemonBallAnimation.classList = ""
            }, 2000);
            setTimeout(() => {
              pokemonImage.classList.remove("unshow")
            }, 4000);
          } else {
            setPokeBallImage(pokemonBallAnimation, "fail")
            setTimeout(() => {
              pokemonBallAnimation.classList.remove("catching")
              pokemonImage.classList.remove("unshow")
              pokemonBallAnimation.classList.remove("catching-fail")
              flashAnimation(pokemonImage)
            }, 500);
          }
        }, randTime);
      }, 900);

      setTimeout(() => {
          playerThrowing.classList.remove("throw");
       }, randTime + 930 + 500 + 2000);
    } else {
      alert("you have ran out of pokeballs")
    }
  }

  // animations

  const flashAnimation = (node) => {
    node.classList.add("flash")
    setTimeout(() => {
      node.classList.remove("flash")
    }, 1500);
  }

  const runAway = (node) => {
    node.classList.add("runAway")
    setTimeout(() => {
      node.classList.remove("runAway")
    }, 1500);
  }

  const playerAnimation = () => {
    const playerThrowing = document.querySelector("#player-throwing")
    const ballContainer = document.querySelector(".ball-container")
    playerThrowing.classList.add("throw")
    ballContainer.classList.add("ball-animation")
    ballContainer.style.backgroundImage = `url("/pokeballs/${currentPokeball.name}/Throwing.png")`
  }

  const setPokeBallImage =  (element, action) => {
    element.classList.add(`catching${action ? "-"+action : ""}`)
    element.style.backgroundImage = `url("/pokeballs/${currentPokeball.name}/${action ? action[0].toUpperCase() + action.slice(1) : "Catching"}.png")`
  }
  return { capture }
}

export default useCapture
