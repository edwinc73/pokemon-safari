import { useSelector } from "react-redux";
import { selectInventory } from "../selectors/selectors";
import itemMap from "../../data/item-map"
import { nanoid } from "nanoid";

class Item{
  constructor(id, x, y, item){
    this.id = id
    this.item = item
    this.x = x
    this.y = y
  }
}

const scatterItems = () => {
  const inventory = useSelector(selectInventory)

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

  return {initializeItems}
}
export default scatterItems


// return item from itemPosss in respect to the raritys

//
