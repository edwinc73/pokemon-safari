const pokemonApi = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1292"
import { nanoid } from "nanoid"

export const fetchData = async () => {
  const response = await fetch(pokemonApi)
  const data = await response.json()
  return data.results
}

const randomPokemonIndex = (allPokemon) => {
  const index = Math.floor(Math.random() * pokemonList.length) + 1
  return allPokemon[index]
}

export const getRandomPokemon = async (allPokemon) => {
  const url = randomPokemonIndex.url
  try {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error("error occurred", error)
  }
}
