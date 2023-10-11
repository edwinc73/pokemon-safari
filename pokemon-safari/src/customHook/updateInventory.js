import { ADD_ITEM, REMOVE_ITEM } from "../actions/actionsCreator";
import { useDispatch } from 'react-redux'


export default function updateInventory () {
  const dispatch = useDispatch()
  //      action add or remove
  const useItem = (item) =>{
    dispatch(ADD_ITEM(item))
  }

  const foundItem = (item) => {
    dispatch(REMOVE_ITEM(item))
  }

  return {useItem, foundItem}
}
