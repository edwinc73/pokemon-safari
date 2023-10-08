import * as actions from "../actions/actionTypes"

export const setLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case actions.LOADED:
      return action.payload
    default:
      return state
  }
}

export const setEncounteredReducer = (state = false, action) => {
  switch (action.type) {
      case actions.ENCOUNTERED:
        return action.payload
    default:
      return state
  }
}
