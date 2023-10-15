import * as actions from "../actions/actionTypes"
import messages from "../js/systemMessages"

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

export const setBagWindowReducer = (state = false, action) => {
  switch (action.type) {
    case actions.OPEN_BAG:
      return action.payload
    default:
      return state
  }
}

export const setSystemMessagesReducer = (state = "", action) => {
  switch (action.type) {
    case actions.SET_SYSTEM_MESSAGE:
      return action.payload
    default:
      return state
  }
}

export const setCurrentInterfaceIndex = (state = 0, action) => {
  switch (action.type) {
    case actions.CURRENT_INTERFACE_INDEX:
      if(state + action.payload > 3 || state + action.payload < 0){
        return state
      }
      return state + action.payload
    default:
      return state
  }
}

export const setGameStartReducer = (state = false, action) => {
  switch (action.type) {
    case actions.START_GAME:
      return action.payload;
    default:
      return state
  }
}

export const setGameScoreReducer = (state= 0, action) => {
  switch (action.type) {
    case actions.SET_GAME_SCORE:
      return action.payload
    default:
      return state
  }
}
