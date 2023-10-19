import { selectEncounter, selectCollisionCoord, selectPosition, selectGrassCoord, selectItemCoord, selectMapItemList } from "../selectors/selectors"
import { useSelector, useDispatch } from "react-redux";
import { encountered } from "../js/encounter";
import { SET_POSITION, SET_ENCOUNTER } from "../actions/actionsCreator"
import { useRef } from 'react';
import config from "../constants/config"


let lastMoveTime = 0;

const useMovement = () => {
  const dispatch = useDispatch()
  const {squareValue, debounceTime, keyNames} = config

  const encounter = useSelector(selectEncounter)
  const collisionCoord = useSelector(selectCollisionCoord)
  const grassCoord = useSelector(selectGrassCoord)
  const itemCoord = useSelector(selectItemCoord)
  const mapItemList = useSelector(selectMapItemList)
  const position = useSelector(selectPosition)

  const handleMovement = (e) => {
    e.stopPropagation();
    //      debounce keypresses
    const currentTime = new Date().getTime();
    if (currentTime - lastMoveTime < debounceTime) return;
    lastMoveTime = currentTime;
    if(encounter) return ;

    //      select DOM elements
    const player = document.getElementById('player');

    const gameMap = document.querySelector(".game-window")
    const computedStyles = window.getComputedStyle(gameMap)

    const currentCoord = {
      x: Math.ceil((parseInt(computedStyles.width) - parseInt(computedStyles.left) - 3970) / squareValue) + 1,
      y: Math.ceil((parseInt(computedStyles.height) - parseInt(computedStyles.top) - 1902) / squareValue) + 1
    }

    const collide = (direction) => {
      const matrix = {
        "up": () => collisionCoord[currentCoord.y - 1][currentCoord.x] == 0,
        "down": () => collisionCoord[currentCoord.y + 1][currentCoord.x] == 0,
        "left": () => collisionCoord[currentCoord.y][currentCoord.x - 1] == 0,
        "right": () => collisionCoord[currentCoord.y][currentCoord.x + 1] == 0
      }
      return matrix[direction]()
    }

    //      moving logic
    switch (e.key) {
      case "ArrowUp":
        if(collide("up") && !encounter) {
          dispatch(SET_POSITION( "walk-up", 0, squareValue ))
          // console.log(position.movementValue)
          if(grassCoord[currentCoord.y][currentCoord.x] != 0 && encountered()){
            dispatch(SET_ENCOUNTER(true))
          }
        }
        break;
        case "ArrowDown":
          if(collide("down") && !encounter){
          dispatch(SET_POSITION( "walk-down", 0, -squareValue ))
          // console.log(position.movementValue)

          if(grassCoord[currentCoord.y][currentCoord.x] != 0 && encountered()){

            dispatch(SET_ENCOUNTER(true))
          }
        }
        break;
      case "ArrowLeft":
        if (collide("left") && !encounter) {
          dispatch(SET_POSITION( "walk-left", squareValue, 0 ))
          // console.log(position.movementValue)

          if(grassCoord[currentCoord.y][currentCoord.x] != 0 && encountered()){

            dispatch(SET_ENCOUNTER(true))
          }
        }
        break;
      case "ArrowRight":
        if (collide("right") && !encounter) {
          dispatch(SET_POSITION( "walk-right", -squareValue, 0 ))
          // console.log(position.movementValue)

          if(grassCoord[currentCoord.y][currentCoord.x] != 0 && encountered()){
            dispatch(SET_ENCOUNTER(true))
          }
        }
        break;
        default:
      break;
    }

    //      animation logic

    if(keyNames.includes(e.key)){
      const keyName = e.key;
      // const key = document.querySelector(`#${keyName}`);
      player.classList.add('walking');
      // key.classList.add("animate-key");
      // setTimeout(() => {
      //   key.classList.remove("animate-key");
      // }, 125);
      setTimeout(() => {
        player.classList.remove('walking');
      }, 1000);
    }
  }

  return { handleMovement }
}

export default useMovement;
