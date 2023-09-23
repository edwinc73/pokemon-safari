import React, { useEffect, useState } from 'react'
import "./Encounter.scss"

export default function EncounterScreen() {

  return (
    <>
      <div id="encounter-screen" className='game d-flex'>
        <div className="battle-section">

        </div>
        <div className="battle-interface d-flex justify-content-between">
          <div className="system-message">
            Hello
          </div>
          <div className="inferface-container">
            <div className="button rounded">Capture</div>
            <div className="button rounded">Item</div>
            <div className="button rounded">Pokeball</div>
            <div className="button rounded">Run</div>
          </div>
        </div>
      </div>
    </>
  )
}
