import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import config from '../../constants/config.js'
import updateInventory from "../../customHook/updateInventory.js"
import { INTERFACE_INDEX, SELECT_ITEM_INDEX, SET_LOADING } from "../../actions/actionsCreator.js"
import navigateInventory from "../../customHook/navigateInventory.js"

import { hasItem } from "../../js/inventory.js"
import { setCurrentInterfaceIndex } from '../../reducers/gameSystemReducers.js'
import { selectInventory, selectCurrentItemIndex, selectBagWindow, selectEncounter, selectShowPopUp } from '../../selectors/selectors.js'

let lastMoveTime = 0;

export default function InventoryInterface() {
  const dispatch = useDispatch()

  const { handleInventoryNavigation } = navigateInventory()
  const encounter = useSelector(selectEncounter)
  const inventory = useSelector(selectInventory)
  const bagWindow = useSelector(selectBagWindow)
  const currentItemIndex = useSelector(selectCurrentItemIndex)

  const inventoryCategories = Object.keys(inventory)
  const pokeballsCategories = inventory[inventoryCategories[0]]
  const baitsCategories = inventory[inventoryCategories[1]]

  useEffect(()=>{
    dispatch(SELECT_ITEM_INDEX(0))
  },[encounter])

    useEffect(() => {
    if (bagWindow) {
      const items = document.querySelectorAll(".inventory>.item")
      // remove active
      items.forEach(item => item.classList.contains("active") && item.classList.remove("active"))
      // add active
      items[currentItemIndex].classList.add("active")
    }
  }, [bagWindow, currentItemIndex])


  useEffect(() => {
      document.addEventListener("keydown", handleInventoryNavigation)
      return () => {
        document.removeEventListener("keydown", handleInventoryNavigation)
      };
    },[bagWindow, currentItemIndex])

  return (

      <div className="inventory d-flex flex-column">
      {pokeballsCategories.map((item) => {
        return(
          <div key={item.name+"container"} className="pokeball-section item d-flex flex-column justify-content-center">
            <div className="item-image" id={item.name}></div>
            <span className='d-flex justify-content-between'><h3 className='inventory-item'>{item.name}</h3> <h3>x {item.quantity}</h3></span>
          </div>
        )
      })}
      <div className="bag-split w-100"></div>
      {baitsCategories.map((item) => {
        return(
          <div key={item.name+"container"} className="bait-section item d-flex flex-column justify-content-center">
            <div className="item-image" id={item.name}></div>
            <span className='d-flex justify-content-between'><h3 className='inventory-item'>{item.name}</h3> <h3>x {item.quantity}</h3></span>
          </div>
        )
      })}
    </div>
  )
}
