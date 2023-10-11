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
    console.log(data && "data loaded")
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
