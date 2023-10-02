import React from "react"
import "./Loading.scss"

export default function Loading(){
  return(
    <>
    <div className="loading d-flex justify-content-center align-items-center flex-column">
      Loading
      <div className="loading-animation"></div>
    </div>
    </>
  )
}
