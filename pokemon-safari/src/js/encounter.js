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
