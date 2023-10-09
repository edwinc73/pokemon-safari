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
        return action.payload
    default:
      return state
  }
}
