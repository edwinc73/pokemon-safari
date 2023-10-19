import * as actions from "../actions/actionTypes"

export const setCollisionCoord = (state = "", action) => {
  switch (action.type) {
    case actions.INIT_COLLISION:
      return action.payload
    default:
      return state
  }
}

export const setGrassCoord = (state = "", action) => {
  switch (action.type) {
    case actions.INIT_GRASS:
      return action.payload
    default:
      return state
  }
}

export const fetchAllPokemonDataReducer =(state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL_POKEMON:
      return action.payload
    default:
      return state
  }
}

export const setMapItemsList = (state = [], action) => {
  switch (action.type) {
    case actions.MAP_ITEMS:
      return action.payload
    case actions.REMOVE_MAP_ITEM:
      const item = state.find(i => i.id == action.payload.id )
      const index = state.indexOf(item)
      item && state.splice(index, 1)
      return state
    default:
      return state
  }
}

export const setItemCoord = (state = [], action) => {
  switch (action.type) {
    case actions.ITEM_COORD:
      return action.payload
    default:
      return state
  }
}
