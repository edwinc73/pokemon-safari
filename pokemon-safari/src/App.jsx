import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

import Key from "../src/features/Key/Key"

function App() {
  return (
    <>
      <div className="game d-flex">
        <div className="game-window p-5">

        </div>
        <Key />
      </div>
    </>
  )
}

export default App
