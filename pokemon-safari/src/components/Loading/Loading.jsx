import { useSelector } from 'react-redux'
import React from "react"
import "./Loading.scss"
import { selectLoading } from '../../selectors/selectors'

export default function Loading(){
  const loading = useSelector(selectLoading)

  const loadingStyle = {
    opacity: loading ? 1 : 0
  }

  return(
    <>
    <div className="loading d-flex justify-content-center align-items-center flex-column" style={loadingStyle}>
      {loading ? "A mysterious pokemon appears!" :"Loading"}
      <div className="loading-animation" ></div>
    </div>
    </>
  )
}
