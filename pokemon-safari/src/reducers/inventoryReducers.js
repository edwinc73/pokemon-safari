import * as actions from "../actions/actionTypes"

export const updateItemReducer = (state= "", action) => {
  switch (action.type) {
    case actions.FOUND_ITEM:
      const foundItemCategory  = Object.keys(state).find(i => state[i].find(x => x.name == action.payload))
      const foundItemState = state[foundItemCategory].map((item) =>
          item.name === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        );

      return {
        ...state,
        [foundItemCategory]: foundItemState
    }
    case actions.USED_ITEM:
      const UsedItemCategory  = Object.keys(state).find(i => state[i].find(x => x.name == action.payload))
      const usedItemState = state[UsedItemCategory].map((item) =>
          item.name === action.payload ? { ...item, quantity: item.quantity - 1 } : item
        );

      return {
        ...state,
        [UsedItemCategory]: usedItemState
      }
    default:
      return state
  }
}

export const setItemIndex = (state = "", action) => {
  switch (action.type) {
    case actions.BROWSE_ITEM:
      return state + action.payload > 5 ? state : state + action.payload
    default:
      return state
  }
}

export const setCurrentPokeball = (state = "", action) => {
  switch (action.type) {
    case actions.SELECT_POKEBALL:
      return action.payload
    default:
      return state
  }
}

export const setBait = (state = "", action) => {
  switch (action.type) {
    case actions.SELECT_BAIT:
      return action.payload
    default:
      return state
  }
}
