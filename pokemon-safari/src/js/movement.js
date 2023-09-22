export const handleMovement = (direction, setDirection, keyNames, collisionMap) => e => {
  const player = document.getElementById('player');
  const gameMap = document.querySelector(".game-window")
  const computedStyles = window.getComputedStyle(gameMap)
  const squareValue = 56;

  const currentCoord = {
    x: (parseInt(computedStyles.width) - parseInt(computedStyles.left) - 3970) / squareValue + 1,
    y: (parseInt(computedStyles.height) - parseInt(computedStyles.top) - 1902) / squareValue + 1
  }

  console.log(currentCoord)
  console.log(collisionMap[currentCoord.y][currentCoord.x])
  // if(collisionMap[currentCoord.y][currentCoord.x] != 42){

  switch (e.key) {
    case "ArrowUp":
      return collisionMap[currentCoord.y -1][currentCoord.x] == 0 &&
      setDirection(prevState => {
        return {
          direction: "walk-up",
          movementValue:{
            x: prevState.movementValue.x,
            y: prevState.movementValue.y + squareValue
          }
        }
      })
    case "ArrowDown":
      return collisionMap[currentCoord.y + 1][currentCoord.x] == 0 &&
      setDirection(prevState => {
        return {
          direction: "walk-down",
          movementValue:{
            x: prevState.movementValue.x,
            y: prevState.movementValue.y - squareValue
          }
        }
      })
    case "ArrowLeft":
      return collisionMap[currentCoord.y][currentCoord.x - 1] == 0 &&
      setDirection(prevState => {
        return {
          direction: "walk-left",
          movementValue:{
            y: prevState.movementValue.y,
            x: prevState.movementValue.x + squareValue
          }
        }
      })
    case "ArrowRight":
      return collisionMap[currentCoord.y][currentCoord.x + 1] == 0 &&
      setDirection(prevState => {
        return{
          direction: "walk-right",
          movementValue:{
            y: prevState.movementValue.y,
            x: prevState.movementValue.x - squareValue
          }
        }
      })
    default:
      break;
  }

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


};

export const mapCollisionCoord = (collisions) =>{
  const collisionCorrd = [[]]
  collisions.map(block =>{
    if (collisionCorrd[collisionCorrd.length - 1].length < 70){
      collisionCorrd[collisionCorrd.length - 1].push(block)
    } else {
      collisionCorrd.push([block])
    }
  }
  )
  return collisionCorrd
}
