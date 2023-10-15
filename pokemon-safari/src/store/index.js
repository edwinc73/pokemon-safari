import { configureStore, applyMiddleware  } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const initialState = {
  inventory:{
    pokeballs:[{
      name: "pokeball",
      quantity: 10,
      value: 0,
      rarity: 1
    },{
      name: "greatball",
      quantity: 1,
      value: 20,
      rarity: 0.4
    },{
      name: "ultraball",
      quantity: 0,
      value: 60,
      rarity: 0.2
    },{
      name: "masterball",
      quantity: 0,
      value: 4000,
      rarity: 0.05
    }
    ],
    baits:[{
      name: "berry",
      quantity : 5,
      value: 5,
      rarity: 1
    },{
      name: "banana",
      quantity : 0,
      value: 20,
      rarity: 0.2
    }
    ],
    etc:[
      {name: "rare candy" , quantity: 0, value: 30, rarity: 0.4},
      {name: "nugget" , quantity: 0, value: 60, rarity: 0.2},
      {name: "admant crystal" , quantity: 0, value: 120, rarity: 0.1}
    ],
  },
  currentPokeball:{name: 'pokeball', quantity: 10, value: 0, rarity: 1},
  currentBait: {name: 'berry', quantity: 5, value: 5}
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: [thunk]
});

console.log(store.getState())

export default store;
