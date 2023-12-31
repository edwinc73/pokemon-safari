import { combineReducers } from 'redux';
import { AddPokemonReducer, encounterPokemonReducer } from "./encounteredPokemonReducers"
import {} from "./pokemonListReducers"
import { fetchAllPokemonDataReducer, setCollisionCoord, setGrassCoord } from "./initializeReducers"
import { setBagWindowReducer, setCurrentInterfaceIndex, setEncounteredReducer, setLoadingReducer, setSystemMessagesReducer } from "./gameSystemReducers"
import { setCurrentPokeball, setItemIndex, updateItemReducer, setBait, setActiveBait, setThrowPokeball } from "./inventoryReducers"
import { setPositionReducer } from "./playerReducers"

const rootReducer = combineReducers({
  loading: setLoadingReducer,
  collisionCoord: setCollisionCoord,
  grassCoord: setGrassCoord,
  position: setPositionReducer,
  encounter: setEncounteredReducer,
  pokemonList: AddPokemonReducer,
  pokemonEncounter: encounterPokemonReducer,
  inventory: updateItemReducer,
  allPokemonData: fetchAllPokemonDataReducer,
  bagWindow: setBagWindowReducer,
  currentInterfaceIndex: setCurrentInterfaceIndex,
  currentItemIndex: setItemIndex,
  currentPokeball: setCurrentPokeball,
  currentBait: setBait,
  systemMessage: setSystemMessagesReducer,
  useBait: setActiveBait,
  thrown: setThrowPokeball
});

export default rootReducer;
