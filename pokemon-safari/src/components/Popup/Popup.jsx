import React, { useEffect, useState } from 'react'

import "./Popup.scss"
import { useSelector, useDispatch } from 'react-redux'
import { selectShowPopUp } from '../../selectors/selectors'
import { SET_SHOW_POPUP } from '../../actions/actionsCreator'

export default function Popup(props){
  const {item} = props
  const showPopup = useSelector(selectShowPopUp)
  const dispatch = useDispatch()

  useEffect(()=>{
    const handleDismiss = (e) => {
      e.stopPropagation();
      if(showPopup && e.key == "z"){
        setTimeout(() => {
          const popUp = document.querySelector(".popup")
          popUp.classList.remove("show")
          dispatch(SET_SHOW_POPUP(false))
        }, 200);
      }
    }
    document.addEventListener('keydown', handleDismiss);
    return () => {
      document.removeEventListener('keydown', handleDismiss);
    };
  }, [showPopup])

  return(
    <div className='popup-container d-flex justify-content-center align-items-center'>
      <div className="popup d-flex justify-content-center align-items-center text-bg-light">
        <h2>
          You got a {item.name && item.name[0].toUpperCase() + item.name.slice(1)}.
        </h2>
      </div>
    </div>
  )
}
