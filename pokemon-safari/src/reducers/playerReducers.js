import * as actions from "../actions/actionTypes"

const origin = {
  direction: "walk-down",
  movementValue: {
    x: -610,
    y: -1150
  }
}

export const setPositionReducer = (state= origin, action) => {
  switch (action.type) {
    case actions.PLAYER_MOVED:
      return{
        direction: action.payload.direction,
        movementValue: {
          x: state.movementValue.x + action.payload.movementValue.x,
          y: state.movementValue.y + action.payload.movementValue.y
        }
      }
    default:
      return state
  }
}
