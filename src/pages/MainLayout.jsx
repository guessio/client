import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className='flex justify-center items-center max-w-full min-h-screen background '>
            <Outlet/>
        </div>
    )
}

export default MainLayout