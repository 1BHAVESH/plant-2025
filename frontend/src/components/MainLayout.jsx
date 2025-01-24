import React from 'react'
import RightSidebar from './RightSidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
        <RightSidebar />
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout