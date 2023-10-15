import config from '../constants/config'

import { useDispatch, useSelector } from 'react-redux'
import { INTERFACE_INDEX, SET_BAGWINDOW, SET_ENCOUNTER, THROW_POKEBALL, ACTIVE_BAIT, REMOVE_ITEM, SYSTEM_MESSAGE, CURRENT_BAIT} from "../actions/actionsCreator"
import { selectBagWindow, selectCurrentInterfaceIndex, selectPokemonEncounter, selectCurrentBait, selectUseBait, selectInventory, selectThrown } from '../selectors/selectors';
import { findItem, hasItem } from "../js/inventory"
import { run } from "../js/encounter"
import messages from '../js/systemMessages'


let lastMoveTime = 0;

export default function navigateInterface () {
  const dispatch = useDispatch()
  const currentInterfaceIndex = useSelector(selectCurrentInterfaceIndex)
  const bagWindow = useSelector(selectBagWindow)
  const pokemon = useSelector(selectPokemonEncounter)
  const useBait = useSelector(selectUseBait)
  const currentBait = useSelector(selectCurrentBait)
  const inventory = useSelector(selectInventory)
  const thrown = useSelector(selectThrown)

  const handleInterfaceKeyDown = (e) => {currentBait.name == "berry" ? "/berry/RazzBerry.png" : "/berry/NanabBerry.png"
    e.stopPropagation();
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
                !thrown && dispatch(THROW_POKEBALL(true))
              break;
              case 1:
                if(hasItem(currentBait) && !useBait){
                  dispatch(ACTIVE_BAIT(true))
                  dispatch(SYSTEM_MESSAGE(messages(pokemon).berry))
                  setTimeout(() => {
                    dispatch(SYSTEM_MESSAGE(messages(pokemon).default))
                  }, 2000);
                  dispatch(REMOVE_ITEM(currentBait))
                  dispatch(CURRENT_BAIT(findItem(inventory, currentBait.name)))
                } else if (useBait) {
                  alert("already used bait.")
                } else {
                  alert("No more berries!")
                }
              break;
              case 2:
                dispatch(SET_BAGWINDOW(true))
              break;
              case 3:
                if(run()){
                  dispatch(SET_ENCOUNTER(false))
                } else {
                  dispatch(SYSTEM_MESSAGE(messages(pokemon).failedRun))
                }
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
