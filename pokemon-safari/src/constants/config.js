const config = {
  backgroundSize: {
    width: 1120 * 4,
    height: 608 * 4
  },
  debounceTime : 250,
  encounterChance: 90, // out of 100
  squareValue: 56,
  directionKeys : ["↑","←","↓","→"],
  keyNames : ["ArrowUp","ArrowLeft", "ArrowDown", "ArrowRight"],
  actionKeys : ["z", "x"],
  shinyChance : 5, // out of 100
  runChance : 75, //out of 100
  maxLevelModifier : 0.5, // out of 1 (50% difference)
  pokemonMinimumLevel : 20, // out of 100
  // maxCatchChance : 400, // max chances
  maxCatchChance : 1, // test max chance
  maxCatchingTime: 2600,
  defaultPokeBall : {
    name: "pokeball",
    quantity: 10,
    value: 0,
    rarity: 1
  },
  defaultBait  : {
    name: "berry",
    quantity : 5,
    value: 5
  }
}

export default config
