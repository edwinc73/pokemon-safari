export const handleMovement = (direction, setDirection, keyNames) => e => {
  const player = document.getElementById('player');
  const squareValue = 56;

  switch (e.key) {
    case "ArrowUp":
      setDirection(prevState => {
        return({
          direction: "walk-up",
          movementValue:{
            x: prevState.movementValue.x,
            y: prevState.movementValue.y + squareValue
          }
        })
      })
      break;
    case "ArrowDown":
      setDirection(prevState => {
        return({
          direction: "walk-down",
          movementValue:{
            x: prevState.movementValue.x,
            y: prevState.movementValue.y - squareValue
          }
        })
      })
      break;
    case "ArrowLeft":
      setDirection(prevState => {
        return({
          direction: "walk-left",
          movementValue:{
            y: prevState.movementValue.y,
            x: prevState.movementValue.x + squareValue
          }
        })
      })
      break;
    case "ArrowRight":
      setDirection(prevState => {
        return({
          direction: "walk-right",
          movementValue:{
            y: prevState.movementValue.y,
            x: prevState.movementValue.x - squareValue
          }
        })
      })
      break;
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
