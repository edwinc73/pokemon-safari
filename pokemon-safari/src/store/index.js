import { configureStore, applyMiddleware  } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const initialState = {
  inventory:{
    pokeballs:[{
      name: "pokeball",
      quantity: 10,
      value: 0,
      rarity: 1,
      src: "/pokeballs/pokeball/idle.png"
    },{
      name: "greatball",
      quantity: 1,
      value: 20,
      rarity: 0.4,
      src: "/pokeballs/greatball/idle.png"

    },{
      name: "ultraball",
      quantity: 0,
      value: 60,
      rarity: 0.2,
      src: "/pokeballs/ultraball/idle.png"

    },{
      name: "masterball",
      quantity: 0,
      value: 4000,
      rarity: 0.05,
      src: "/pokeballs/masterball/idle.png"
    }
    ],
    baits:[{
      name: "berry",
      quantity : 5,
      value: 5,
      rarity: 1,
      src: "/berry/RazzBerry.png"

    },{
      name: "banana",
      quantity : 0,
      value: 20,
      rarity: 0.2,
      src: "/berry/NanabBerry.png"
    }
    ],
    etc:[
      {name: "rare candy" , quantity: 0, value: 30, rarity: 0.4, src: "/rare_candy.png"},
      {name: "nugget" , quantity: 0, value: 60, rarity: 0.2, src: "/nugget.png"},
      {name: "crystal" , quantity: 0, value: 120, rarity: 0.1, src: "/adamant_orb.png"}
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

export default store;
