import * as actions from "./actionTypes"

// initialize game

export const SET_COLLISION = (collisionCoord) => ({
  type: actions.INIT_COLLISION,
  payload: collisionCoord
})

export const SET_GRASS = (grassCoord) => ({
  type: actions.INIT_GRASS,
  payload: grassCoord
})


// game event screen triggers
export const SET_LOADING = (isLoading) =>({
  type: actions.LOADED,
  payload: isLoading
})

export const SET_ENCOUNTER = (encountered) =>({
  type: actions.ENCOUNTERED,
  payload: encountered
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

export const NEW_POKEMON = (id, name, shiny, sprite, level) => ({
  type: actions.FOUND_POKEMON,
  payload: {id, name, shiny, sprite, level}
})












export const ADD_POKEMON = (pokemon) => ({
  type: actions.POKEMON_CAPTURED,
  payload: pokemon
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
