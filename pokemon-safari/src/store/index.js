import { configureStore } from '@reduxjs/toolkit';
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
      quantity: 0,
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
      rarity: 0.025
    }
    ],
    baits:[{
      name: "berry",
      quantity : 5,
      value: 5
    },{
      name: "banana",
      quantity : 0,
      value: 15
    }
    ],
    etc:[],
  }
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState
});

export default store;
