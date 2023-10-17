import { useDispatch, useSelector } from "react-redux";
import { selectInventory, selectMapItemList } from "../../selectors/selectors";
import itemMap from "../../../data/item-map"
import { nanoid } from "nanoid";
import config from "../../constants/config";
import { createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";
import { SET_MAP_ITEMS_LIST } from "../../actions/actionsCreator";
import { useEffect } from "react";

class Item{
  constructor(id, x, y, item){
    this.id = id
    this.item = item
    this.x = x
    this.y = y
  }
}

const Items = () => {
  const dispatch = useDispatch();

  const inventory = useSelector(selectInventory)
  const mapItemsList = useSelector(selectMapItemList)

  const itemPossibilities = [
    ...inventory.pokeballs,
    ...inventory.baits,
    ...inventory.etc
  ]

  const totalRarity = itemPossibilities.reduce((acc, item) => acc + item.rarity,0)

  const generateItem = () => {
    let chance = Math.random() * totalRarity

    for(const item of itemPossibilities){
      chance -= item.rarity
      if(chance <= 0){
        return item
      }
    }
  }

  const generateCoord = () => {
    const validIndexes = [];

    for (let i = 0; i < itemMap.length; i++) {
      for (let j = 0; j < itemMap[i].length; j++) {
        if (itemMap[i][j] === 391) {
          validIndexes.push({ row: i, col: j });
        }
      }
    }
    let selectedCoords = []
    for (let i = 0; i < 20; i++) {
      selectedCoords.push(validIndexes[Math.floor(Math.random() * validIndexes.length)])
    }
    return selectedCoords
  }

  useEffect(()=>{
    const initializeItems = () => {
      const itemCoords = generateCoord()
      const mapItems = []
      for (let i = 0; i < 20; i++) {
        mapItems.push(
          new Item(nanoid(), itemCoords[i].row, itemCoords[i].col, generateItem())
        )
      }
      return mapItems
    }

    const items = initializeItems()

    dispatch(SET_MAP_ITEMS_LIST(items))
  }, [])

  const displayItems = mapItemsList.map(item => {
    console.log(item)
    const imageStyle =  {
      position: "absolute",
      width: "40px",
      height: "40px",
      top: `${((item.y - 2) * config.squareValue)}px`,
      left: `${((item.x - 2)* config.squareValue)}px`
    }

    const titlePos = {
      position: "absolute",
      width: "40px",
      height: "40px",
      top: `${((0) * config.squareValue)}px`,
      left: `${((item.x - 2)* config.squareValue)}px`,
      zIndex:  30
    }
    console.log(`${(item.y * config.squareValue)}`)
    console.log(`${(item.x * config.squareValue)}`)

    return(
      <>
        <h2 style={titlePos}>{item.y}, {item.x}</h2>
        <img key={item.id} style={imageStyle} alt={`item-${item.id}`} src="./pokeballs/pokeball/idle.png" />
      </>
    )
  })

  return(
    <>
      {displayItems}
    </>
  )
}
export default Items


// return item from itemPosss in respect to the raritys

//
