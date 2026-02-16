import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const MainLayout = () => {
  return (
    <div className=''>
      <Outlet />
      <Toaster />
    </div>
  )
}

export default MainLayout