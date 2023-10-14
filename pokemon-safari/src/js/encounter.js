import { current } from "@reduxjs/toolkit"
import config from "../constants/config"
const pokemonApi = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1292"

export const getPokemonData = async () =>{
  const response = await fetch(pokemonApi)
  const data = await response.json()
  return data.results
}

export const randomPokemon = (pokemonList) =>{
  const index = Math.floor(Math.random() * pokemonList.length)
  return pokemonList[index].url
}

export const getEncounteredPokemon = async (pokemonUrl) =>{
  try {
    const response = await fetch(pokemonUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error occured", error)
    throw error
  }
}

export const encountered = () =>{
  const chance = Math.random() * 100 < config.encounterChance
  return chance
}

export const pokemonName = (name) => {
  const newName = name.split("-")[0]
  return newName[0].toUpperCase() + newName.slice(1)
}

export const isShiny = () => Math.floor(Math.random() * 100) < config.shinyChance

export const setPokemonLevel = () => config.pokemonMinimumLevel + Math.floor(Math.random() * 80)

// custom hook
export const isCaught = (pokemon, currentPokeball, currentBait, useBait) => {
  const pokeballValue = currentPokeball.value
  const baitValue = useBait ? currentBait.value : 0
  const levelAdjuster = ((pokemon.level / 100) * config.maxLevelModifier) + 1
  const attempt =  Math.floor(Math.random() * config.maxCatchChance)
  console.log(pokeballValue , baitValue)
  return attempt + pokeballValue + baitValue > pokemon.baseExperience * levelAdjuster
}

export const randomCatchingTime = (caught) => {
  let randomTime = Math.random()
  if(caught){
    return randomTime > 0.9 ? 2000 / 3 : config.maxCatchingTime
  } else if (randomTime > 0.8){
    return 500
  } else if (randomTime > 0.65){
    return 2000 / 3
  } else if (randomTime > 0.3){
    return 2000 / 3 * 2
  } else {
    return config.maxCatchingTime
  }
}

export const run = () => {
  return config.runChance > Math.floor(Math.random() * 100)
}
