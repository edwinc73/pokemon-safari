export default class CaughtPokemon{
  constructor(id, name, url, level, isShiny, isCaught = false){
    this.id = id
    this.name = name
    this.level = level
    this.url = url
    this.isShiny = isShiny
    this.isCaught = false
  }

  catch(){
    this.isCaught = true
  }
}
