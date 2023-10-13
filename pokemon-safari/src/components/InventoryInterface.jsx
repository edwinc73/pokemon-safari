import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import config from '../constants/config.js'
import updateInventory from "../customHook/updateInventory.js"
import { INTERFACE_INDEX, SELECT_ITEM_INDEX, SET_LOADING } from "../actions/actionsCreator.js"

import { hasItem } from "../js/inventory"
import { setCurrentInterfaceIndex } from '../reducers/gameSystemReducers'
import { selectInventory, selectCurrentItemIndex } from '../selectors/selectors'

let lastMoveTime = 0;

export default function InventoryInterface() {
  const dispatch = useDispatch()

  const inventory = useSelector(selectInventory)

  const inventoryCategories = Object.keys(inventory)
  const pokeballsCategories = inventory[inventoryCategories[0]]
  const baitsCategories = inventory[inventoryCategories[1]]

  useEffect(() => {
      document.addEventListener("keydown", navigateInventory)
      return () => {
        document.removeEventListener("keydown", navigateInventory)

      };
    },[bagWindow, inventory, currentItemIndex, closeBag])

  return (

      <div className="inventory d-flex flex-column">
      {pokeballsCategories.map((item) => {
        console.log(item)
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
