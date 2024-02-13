import { SidebarNavItems, SidebarNavSupportItems } from '../utilities/constants';


const Sidebar = () => {
  return (
    <div className='flex flex-col justify-between w-[200px] h-full shadow-xl p-2'>
        <div className='flex flex-col'>
            {
                SidebarNavItems.map((item)=>(<li className='list-none text-lg font-medium'>{item}</li>))
            }
        </div>
          <div className='flex flex-col'>
            {
                  SidebarNavSupportItems.map((item) => (<li className='list-none text-lg font-medium'>{item}</li>))
            }
        </div>
    </div>
  )
}

export default Sidebar