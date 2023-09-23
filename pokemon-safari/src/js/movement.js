let lastMoveTime = 0;
const debounceTime = 250;
// const debounceTime = 50;
const encounterChance = 10 // out of 100

export const handleMovement = (direction, setDirection, keyNames, collisionMap, grassMap, setEncounter, encounter) => e => {
  const currentTime = new Date().getTime();
  if (currentTime - lastMoveTime < debounceTime) return;
  lastMoveTime = currentTime;
  if(encounter){
    return
  } else {
    const player = document.getElementById('player');

  // get coordinates
  const gameMap = document.querySelector(".game-window")
  const computedStyles = window.getComputedStyle(gameMap)
  const squareValue = 56;
  const currentCoord = {
    x: Math.ceil((parseInt(computedStyles.width) - parseInt(computedStyles.left) - 3970) / squareValue + 1),
    y: Math.ceil((parseInt(computedStyles.height) - parseInt(computedStyles.top) - 1902) / squareValue + 1)
  }

  // animation logic
  if(keyNames.includes(e.key)){
    const keyName = e.key;
    const key = document.querySelector(`#${keyName}`);
    player.classList.add('walking');
    key.classList.add("animate-key");
    setTimeout(() => {
      key.classList.remove("animate-key");
    }, 125);
    setTimeout(() => {
      player.classList.remove('walking');
    }, 1000);
  }

  const encounterPokemon = ()=>{
    if(grassMap[currentCoord.y][currentCoord.x] != 0){
      if((Math.random() * 100) > encounterChance){
        console.log("encountered a pokemon")
        setEncounter(true)
      }
    }
  }

  // movement logic
  switch (e.key) {
    case "ArrowUp":
      if(collisionMap[currentCoord.y -1][currentCoord.x] == 0) {
        encounterPokemon()
        setDirection(prevState => {
          return {
            direction: "walk-up",
            movementValue:{
              x: prevState.movementValue.x,
              y: prevState.movementValue.y + squareValue
            }
          }
        })
      }
      break;
    case "ArrowDown":
      if(collisionMap[currentCoord.y + 1][currentCoord.x] == 0){
        encounterPokemon()
        setDirection(prevState => {
          return {
            direction: "walk-down",
            movementValue:{
              x: prevState.movementValue.x,
              y: prevState.movementValue.y - squareValue
            }
          }
        })
      }
      break;
    case "ArrowLeft":
      if (collisionMap[currentCoord.y][currentCoord.x - 1] == 0) {
        encounterPokemon()
        setDirection(prevState => {
          return {
            direction: "walk-left",
            movementValue:{
              y: prevState.movementValue.y,
              x: prevState.movementValue.x + squareValue
            }
          }
        })
      }
      break;

    case "ArrowRight":
      if (collisionMap[currentCoord.y][currentCoord.x + 1] == 0) {
        encounterPokemon()
        setDirection(prevState => {
          return{
            direction: "walk-right",
            movementValue:{
              y: prevState.movementValue.y,
              x: prevState.movementValue.x - squareValue
            }
          }
        })
      }
      break;

    default:
      break;
  }
  }
};