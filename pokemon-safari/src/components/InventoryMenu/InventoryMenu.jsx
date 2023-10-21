import React, { useEffect, useState } from 'react'

import "./InventoryMenu.scss"
import { useSelector, useDispatch } from 'react-redux'
import { selectInventory } from '../../selectors/selectors'

export default function InventoryMenu(props){
  const dispatch = useDispatch()
  const inventory = useSelector(selectInventory)

  const pokeballs = inventory.pokeballs.map(item => {
    return(
      <div className="pokeball d-flex justify-content-between align-items-center">
        <div className='item-name d-flex align-items-center'>
          <span> <img className="pokeball-image" src={item.src} alt="" /></span>
          <span> <p>{item.name}</p> </span>
        </div>
        <div className="item-quantity">
          x {item.quantity}
        </div>
      </div>
    )
  })

  const baits = inventory.baits.map(item => {
    return(
      <div className="pokeball d-flex justify-content-between align-items-center">
        <div className='item-name d-flex align-items-center'>
          <span> <img className="pokeball-image" src={item.src} alt="" /></span>
          <span> <p>{item.name}</p> </span>
        </div>
        <div className="item-quantity">
          x {item.quantity}
        </div>
      </div>
    )
  })

  const etc = inventory.etc.map(item => {
    return(
      <div className="pokeball d-flex justify-content-between align-items-center">
        <div className='item-name d-flex align-items-center'>
          <span> <img className="pokeball-image" src={item.src} alt="" /></span>
          <span> <p>{item.name}</p> </span>
        </div>
        <div className="item-quantity">
          x {item.quantity}
        </div>
      </div>
    )
  })

  return(
    <>
    <div className="inventory-menu text-bg-light">
      <div className="inventory-container d-flex flex-column align-items-center w-100">
        Inventory:
        <div className="item-list">
          <div className="pokeballs">
            {pokeballs}
          </div>
          <br />
          <div className="pokeballs">
            {baits}
          </div>
          <br />
          <div className="pokeballs">
            {etc}
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
