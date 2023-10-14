import * as actions from "./actionTypes"
import { fetchData } from "../services/fetch"

// initialize game

export const SET_COLLISION = (collisionCoord) => ({
  type: actions.INIT_COLLISION,
  payload: collisionCoord
})

export const SET_GRASS = (grassCoord) => ({
  type: actions.INIT_GRASS,
  payload: grassCoord
})

export const FETCH_ALL_POKEMON_DATA = () => {
  return async (dispatch) => {
    try {
      const response = await fetchData();
      dispatch({
        type: actions.FETCH_ALL_POKEMON,
        payload: response
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
}

// game event screen triggers
export const SET_LOADING = (isLoading) =>({
  type: actions.LOADED,
  payload: isLoading
})

export const SET_ENCOUNTER = (encountered) =>({
  type: actions.ENCOUNTERED,
  payload: encountered
})

export const SET_BAGWINDOW = (boolean) => ({
  type: actions.OPEN_BAG,
  payload: boolean
})

export const ACTIVE_BUTTON = (index) => ({
  type: actions.BROWSE_INTERFACE,
  payload: index
})

export const SYSTEM_MESSAGE = (message) => ({
  type : actions.SET_SYSTEM_MESSAGE,
  payload: message
})

export const INTERFACE_INDEX = (i) => ({
  type: actions.CURRENT_INTERFACE_INDEX,
  payload: i
})


// player movement
export const SET_POSITION = (direction, x, y) => ({
  type: actions.PLAYER_MOVED,
  payload: {
    direction: direction,
    movementValue: {
      x: x,
      y: y
    }
  }
})





// encounters

export const NEW_POKEMON = (id, name, shiny, sprite, level,baseExperience) => ({
  type: actions.FOUND_POKEMON,
  payload: {id, name, shiny, sprite, level, baseExperience}
})

export const ADD_POKEMON = (pokemon) => ({
  type: actions.POKEMON_CAPTURED,
  payload: pokemon
})

export const THROW_POKEBALL = (boolean) => ({
  type: actions.POKEBALL_THROWN,
  payload: boolean
})





// inventory
export const ADD_ITEM = (item) => ({
  type: actions.FOUND_ITEM,
  payload: item
})

export const REMOVE_ITEM = (item) => ({
  type: actions.USED_ITEM,
  payload: item
})

export const SELECT_ITEM_INDEX = (index) => ({
  type: actions.BROWSE_ITEM,
  payload: index
})

export const CURRENT_POKEBALL = (item) => ({
  type: actions.SELECT_POKEBALL,
  payload: item
})

export const CURRENT_BAIT = (item) => ({
  type: actions.SELECT_BAIT,
  payload: item
})

export const ACTIVE_BAIT = (boolean) => ({
  type: actions.SET_BAIT,
  payload: boolean
})
