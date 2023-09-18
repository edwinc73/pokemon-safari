import React from "react"
import "./Key.scss"

export default function Key(props){

  const directionKeys = ["↑","←","↓","→"]
  const keyNames = ["ArrowUp","ArrowLeft", "ArrowDown", "ArrowRight"]

  const handleMovement = e => {
    if(keyNames.includes(e.key)){
      const keyName = e.key
      const key = document.querySelector(`#${keyName}`)
      key.classList.add("animate-key");
      setTimeout(() => {
        key.classList.remove("animate-key");
      }, 125);
    }
  }

  React.useEffect(()=>{
    document.addEventListener('keyup', handleMovement);
    return () => {
      document.removeEventListener('keyup', handleMovement);
    };
  }, [])

  const directionKeysComponent = directionKeys.map((direction, index)  => {
    return(
      <div key={index} id={keyNames[index]} className="key d-flex justify-content-center align-items-center">
        {direction}
      </div>
    )
  })

  return(
    <>
      <div className="direction-keys">
        {directionKeysComponent}
      </div>
    </>
  )
}
