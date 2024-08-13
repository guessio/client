import './App.css'
import logo from './assets/logo.png'



function App() {


  return (
    <>
      <div className='flex justify-center items-center max-w-full min-h-screen background '>
        <div className='text-center'>
          <img src={logo} alt="" className='w-1/2 h-1/2 mx-auto -mt-36' />

        </div>
        <div class="btn-container">
          <button class="glowing-button">
            PLAY NOW
            <span class="arrow">➔</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default App
