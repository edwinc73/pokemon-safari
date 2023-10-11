const messages = (name, shiny) =>{
  return {
    default: "What would you like to do?",
    encounter: `You encountered a ${name}!`,
    berry: `You used a berry, ${name} is now easier to catch`,
    throw: "you throw a pokeball",
    caught: `You caught a ${shiny ? "shiny" : ""} ${name}`,
    failed: "Darn, so close!",
    failedRun: `${name} blocked your escape!`
  }
}

export default messages
