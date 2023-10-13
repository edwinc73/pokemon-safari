import config from "../constants/config"
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBait, selectCurrentPokeball } from "../selectors/selectors";
import { isCaught, randomCatchingTime } from "../js/encounter";
import { SYSTEM_MESSAGE } from "../actions/actionsCreator";
import messages from "../js/systemMessages";

const useCapture = () => {
  const dispatch = useDispatch()
  const currentBait = useSelector(selectCurrentBait)
  const currentPokemon = useSelector(selectCurrentPokeball)

  const capture = () => {
    const pokemonImage = document.querySelector("#pokemonImage")
    const playerThrowing = document.querySelector("#player-throwing")
    const ballContainer = document.querySelector(".ball-container")
    const pokemonBallAnimation = document.querySelector("#pokemonBallAnimation")

    const pokeballName = currentPokeball.name
    const caught = isCaught()

    dispatch(SYSTEM_MESSAGE(messages.throw))

    // catch times

    const randTime = randomCatchingTime()

    const setPokeBallImage =  (element, action) => {
      element.classList.add(`catching${action ? "-"+action : ""}`)
      element.style.backgroundImage = `url("/pokeballs/${pokeballName}/${action ? action[0].toUpperCase() + action.slice(1) : "Catching"}.png")`
    }


  // if(throwing){


  //   setSystemMessage(messages.throw)
  //   playerThrowing.classList.add("throw")

  //   ballContainer.classList.add("ball-animation")
  //   ballContainer.style.backgroundImage = `url("/pokeballs/${pokeballName}/Throwing.png")`

  //   const randTime = randomCatchingTime()

  //   setTimeout(() => {
  //     if(wasCaught){
  //       setTimeout(()=>{
  //         const caughtPokemon = new CaughtPokemon(nanoid(), pokemonName, isShiny ? shinySprite.front : normalSprite.front, pokemonLevel, isShiny);
  //         setCaughtPokemonList(prevState => [...prevState, caughtPokemon]);
  //         setSystemMessage(messages.caught);
  //         setTimeout(() => {
  //           pokemonBallAnimation?.classList.remove("catching-success")
  //           clearEncounter();
  //         }, 3000);
  //       }, randTime)
  //     } else {
  //         setSystemMessage(messages.failed);
  //         setTimeout(() => {
  //             setSystemMessage(messages.default);
  //         }, randTime);
  //     }
  //   }, randTime);

  //   setTimeout(() => {
  //     ballContainer.classList.remove("ball-animation")
  //     flashAnimation(pokemonImage)
  //     pokemonImage.classList.add("unshow")
  //     setPokeBallImage(pokemonBallAnimation, "")
  //     setTimeout(() => {
  //       if(wasCaught){
  //         setPokeBallImage(pokemonBallAnimation, "success")
  //       } else {
  //         setPokeBallImage(pokemonBallAnimation, "fail")
  //         setTimeout(() => {
  //           pokemonBallAnimation.classList.remove("catching-fail")
  //           flashAnimation(pokemonImage)
  //           pokemonImage.classList.remove("unshow")
  //         }, 500);
  //       }
  //       pokemonBallAnimation.classList.remove("catching")
  //     }, randTime);
  //   }, 925);

  //   setTimeout(() => {
  //       setThrowing(false);
  //       playerThrowing.classList.remove("throw");
  //       setUseBerry(false)
  //   }, randTime + 930 + 500 + 2000);
  // }
  // }
  }
  return { capture }
}

export default useCapture
