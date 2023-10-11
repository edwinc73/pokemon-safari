import * as actions from "../actions/actionTypes"

export const encounterPokemonReducer = (state ={}, action) => {
  switch (action.type) {
    case actions.FOUND_POKEMON:
      return action.payload
    default:
      return state
  }
}

export const AddPokemonReducer = (state = [], action) => {
  switch (action.type) {
    case actions.POKEMON_CAPTURED:
      return [
        ...state, action.payload
      ]
    default:
      return state
  }
}
