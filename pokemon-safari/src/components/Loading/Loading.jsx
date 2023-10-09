import React from "react"
import "./Loading.scss"

export default function Loading(props){
  const {encounter} = props
  return(
    <>
    <div className="loading d-flex justify-content-center align-items-center flex-column">
      {encounter ? "A mysterious pokemon appears!" :"Loading"}
      <div className="loading-animation" ></div>
    </div>
    </>
  )
}
