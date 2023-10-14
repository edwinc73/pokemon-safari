import React from "react"
import "./Key.scss"

export default function Key(props){
  const {directionKeys, keyNames, actionKeys} = props

  const directionKeysComponent = directionKeys.map((direction, index)  => {
    return(
      <div key={"direction" + index} id={keyNames[index]} className="key d-flex justify-content-center align-items-center">
        {direction}
      </div>
    )
  })

  const actionKeysComponent = actionKeys.map((key, index) => {
    return (
      <div key={"action" + index} className="action-keys key d-flex justify-content-center align-items-center">
        {key}
      </div>
    )
  })
  return(
    <>
      <div className="direction-keys">
        {directionKeysComponent}
      </div>
      <div className="action-keys">
        {actionKeysComponent}
      </div>
    </>
  )
}
