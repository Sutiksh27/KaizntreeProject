import Dashboard from '../pages/Dashboard'
import Sidebar from '../components/Sidebar'



const DashboardContainer = () => {
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