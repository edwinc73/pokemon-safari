import React from "react"
import "./Key.scss"

export default function Key(props){
  const {directionKeys, keyNames} = props
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
