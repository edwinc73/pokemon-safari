import config from "../constants/config"
const pokemonApi = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1292"


export const getPokemonData = async () =>{
  const response = await fetch(pokemonApi)
  const data = await response.json()
  return data.results
}

export const randomPokemon = (pokemonList) =>{
  const index = Math.floor(Math.random() * pokemonList.length) + 1
  return pokemonList[index]
}

export const getEncounteredPokemon = async (encounteredPokemon) =>{
  const encounteredPokemonURL = encounteredPokemon.url
  try {
    const response = await fetch(encounteredPokemonURL)
    const data  = await response.json()
    return data
  } catch (error) {
    console.error("Error occured", error)
  }
}

export const encountered = () =>{
  return Math.random() * 100 < config.encounteredChance
}
