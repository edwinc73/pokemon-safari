export default class CaughtPokemon{
  constructor(id, name, url, level, isShiny){
    this.id = id
    this.name = name
    this.level = level
    this.url = url
    this.isShiny = isShiny
    this.isCaught = true
  }
}
