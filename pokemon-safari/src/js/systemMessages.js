const messages = (pokemon) =>{
  return {
    default: "What would you like to do?",
    encounter: `You encountered a ${pokemon.name}!`,
    berry: `${pokemon.name} is now easier to catch.`,
    throw: "you throw a pokeball",
    caught: `You caught a ${pokemon.shiny ? "shiny" : ""} ${pokemon.name}!`,
    failed: "Darn, so close!",
    failedRun: `${pokemon.name} blocked your escape!`,
    pokemonRun : `${pokemon.name} ran away!`,
    looking: `${pokemon.name} is looking around`
  }
}

export default messages
