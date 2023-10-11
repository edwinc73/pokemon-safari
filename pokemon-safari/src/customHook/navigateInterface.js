import config from '../constants/config'

import { useDispatch, useSelector } from 'react-redux'
import { INTERFACE_INDEX } from "../actions/actionsCreator"
import { selectBagWindow, selectCurrentBait, selectCurrentInterfaceIndex, selectPokemonEncounter } from '../selectors/selectors';

let lastMoveTime = 0;

export default function navigateInterface () {
  const dispatch = useDispatch()
  const currentInterfaceIndex = useSelector(selectCurrentInterfaceIndex)
  const currentBait = useSelector(selectCurrentBait)
  const bagWindow = useSelector(selectBagWindow)
  const pokemon = useSelector(selectPokemonEncounter)

  const handleInterfaceKeyDown = (e) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastMoveTime < config.debounceTime) {
      return;
    } else {
      if (pokemon && !bagWindow) {
        switch (e.key) {
          case "ArrowUp":
            dispatch(INTERFACE_INDEX(-2))
          break;
          case "ArrowDown":
            dispatch(INTERFACE_INDEX(2));
          break;
          case "ArrowLeft":
            dispatch(INTERFACE_INDEX(-1));
          break;
          case "ArrowRight":
            dispatch(INTERFACE_INDEX(1));
          break;
          case "z":
            switch (currentInterfaceIndex) {
              case 0:
                setThrow()
              break;
              case 1:
                if(currentBait && hasItem(currentBait)){
                  setUseBerry(true)
                } else if(!currentBait) {
                  alert("Please select berry")
                } else if (!hasItem(currentBait)){
                  alert("No more berries!")
                }
              break;
              case 2:
                openBag()
              break;
              case 3:
                run()
              break;
            }
          break;
          default:
          break;
        }
      }
      lastMoveTime = currentTime
    }
  };
  return {handleInterfaceKeyDown}
}
