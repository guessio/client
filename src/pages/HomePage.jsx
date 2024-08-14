import React from 'react'
import logo from '../assets/logo.png'
import Button from '../components/Button'

const HomePage = () => {
    return (
        <>


        
            <div className='text-center'>
                <img src={logo} alt="" className='w-1/2 h-1/2 mx-auto -mt-36' />
            </div>
            <Button />
        </>
    )
}

export default HomePage