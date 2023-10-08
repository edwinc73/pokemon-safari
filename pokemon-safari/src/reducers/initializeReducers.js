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
