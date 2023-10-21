import { useDispatch, useSelector } from "react-redux";
import { selectInventory, selectMapItemList } from "../../selectors/selectors";
import itemMap from "../../../data/item-map"
import { nanoid } from "nanoid";
import config from "../../constants/config";
import { SET_ITEM_COORD, SET_MAP_ITEMS_LIST } from "../../actions/actionsCreator";
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
          validIndexes.push({ yIndex: i, xIndex: j });
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
          new Item(nanoid(), itemCoords[i].xIndex, itemCoords[i].yIndex, generateItem())
        )
      }
      return mapItems
    }

    const items = initializeItems()

    const foundCoord = (x , y) => {
      return items.some( item => item.y ==y && item.x == x)
    }

    const findItem = (x, y) => {
      return items.find(item => item.y == y && item.x == x)
    }
    const itemCoord = []

    for (let i = 0; i < 38; i++) {
      let row  = []
      for (let a = 0; a < 70; a++) {
          const value = foundCoord(i, a) ? findItem(i,a) : 0
          row.push(value)
      }
      itemCoord.push(row)
    }

    dispatch(SET_ITEM_COORD(itemCoord))
    dispatch(SET_MAP_ITEMS_LIST(items))
  }, [])

  const displayItems = mapItemsList.map(item => {
    const imageStyle =  {
      position: "absolute",
      width: "40px",
      height: "40px",
      objectFit: "contain",
      top: `${(item.y * config.squareValue)}px`,
      left: `${(item.x * config.squareValue)}px`
    }

    return(
      <img className="map-item" key={item.id} style={imageStyle} alt={`item-${item.id}`} src="./pokeballs/pokeball/idle.png" />
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
