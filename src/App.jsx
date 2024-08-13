import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from './assets/logo.png'

function App() {


  return (
    <>
      <div className='flex justify-center items-center max-w-full min-h-screen background '>
        <div className='text-center'>
          <img src={logo} alt="" className='w-1/2 h-1/2 mx-auto -mt-36' />
          <h1 className='text-4xl mb-5'>Welcome</h1>
          <button className="button-with-icon">
            <svg
              class="icon"
              id="Play"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="color000000 svgShape"
                fill="#ffffff"
                d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
              ></path>
            </svg>
            <span class="text">Play</span>
          </button>

        </div>
      </div>
    </>
  )
}

export default App
