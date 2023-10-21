import config from '../constants/config'

import { useDispatch, useSelector } from 'react-redux'
import { CURRENT_BAIT, CURRENT_POKEBALL, SELECT_ITEM_INDEX, SET_BAGWINDOW } from "../actions/actionsCreator"
import { selectBagWindow, selectCurrentItemIndex, selectInventory } from '../selectors/selectors';
import { findItem } from '../js/inventory';

let lastMoveTime = 0;
export default function navigateInventory () {
  const dispatch = useDispatch()
  const inventory = useSelector(selectInventory)
  const bagWindow = useSelector(selectBagWindow)
  const currentItemIndex = useSelector(selectCurrentItemIndex)

  const handleInventoryNavigation = (e) => {
    e.stopPropagation();

    const closeInventory = () => {
        dispatch(SET_BAGWINDOW(false))
    }

    const currentTime = new Date().getTime();

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
            closeInventory()
          break;
          case "z":
            if(currentItemIndex <= 3){
              const item = inventory.pokeballs[currentItemIndex]
              dispatch(CURRENT_POKEBALL(item));
            } else {
              if(currentItemIndex == 4){
                dispatch(CURRENT_BAIT(findItem(inventory, "berry")))
              } else {
                dispatch(CURRENT_BAIT(findItem(inventory, "banana")))
              }
            }
            closeInventory()
            break;
          default:
          break;
        }
      }
      lastMoveTime = currentTime
    }
  return { handleInventoryNavigation }
}
