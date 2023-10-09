import { selectEncounter } from "../selectors/selectors"
import { useSelector, useDispatch } from "react-redux";
import config from "../constants/config"

let lastMoveTime = 0;

const useMovement = () => {
  const dispatch = useDispatch()
  const {squareValue, debounceTime, keyNames} = config

  const encounter = useSelector(selectEncounter)

  const handleMovement = (e) => {

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
      x: Math.ceil((parseInt(computedStyles.width) - parseInt(computedStyles.left) - 3970) / squareValue + 1),
      y: Math.ceil((parseInt(computedStyles.height) - parseInt(computedStyles.top) - 1902) / squareValue + 1)
    }

    //  animation logic

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
  return {
    handleMovement
  }
}

export default useMovement;
