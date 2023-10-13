import config from '../constants/config'

import { useDispatch, useSelector } from 'react-redux'
import { SELECT_ITEM_INDEX } from "../actions/actionsCreator"
import { selectBagWindow, selectCurrentBait, selectCurrentInterfaceIndex, selectPokemonEncounter } from '../selectors/selectors';

let lastMoveTime = 0;
export default function navigateInterface () {
  const dispatch = useDispatch()

  const handleInventoryNavigation = () => {
      const pokeballs = Object.keys(inventory.pokeballs)
      const baits = inventory.baits
      if(bagWindow){
        switch (e.key) {
          case "ArrowDown":
            dispatch(SELECT_ITEM_INDEX(1))
          break;
          case "ArrowUp":
            dispatch(SELECT_ITEM_INDEX(-1))
          break;
          case "x":
            closeBag()
          break;
          case "z":
            if(currentItemIndex < 3){
              setCurrentPokeball(inventory.pokeballs[pokeballs[currentItemIndex]])
              closeBag()
            } else {
              if(currentItemIndex == 4){
                setCurrentBait(baits.berry)
              } else {
                setCurrentBait(baits.banana)
              }
              closeBag()
            }
            break;
          default:
          break;
        }
      }
    }
  return { handleInventoryNavigation }
}
