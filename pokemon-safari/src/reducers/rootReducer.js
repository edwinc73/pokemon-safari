import { combineReducers } from 'redux';
import { AddPokemonReducer, encounterPokemonReducer } from "./encounteredPokemonReducers"
import {} from "./pokemonListReducers"
import { fetchAllPokemonDataReducer, setCollisionCoord, setGrassCoord } from "./initializeReducers"
import { setEncounteredReducer, setLoadingReducer } from "./gameSystemReducers"
import { updateItemReducer } from "./inventoryReducers"
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
  allPokemonData: fetchAllPokemonDataReducer
});

export default rootReducer;
