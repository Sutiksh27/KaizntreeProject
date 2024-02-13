import React from 'react'
import Dashboard from '../pages/Dashboard'
import Sidebar from '../components/Sidebar'

type Props = {}

const DashboardContainer = (props: Props) => {
  return (
    <>
      <div className='flex flex-row h-screen shadow-md'>
        <Sidebar/>
        <Dashboard />
      </div>
    </>
  )
}

export default DashboardContainer