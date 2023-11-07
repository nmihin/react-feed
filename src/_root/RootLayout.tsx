import Footer from '@/components/shared/Footer'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Topbar from '@/components/shared/Topbar'

import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Topbar></Topbar>
      <LeftSidebar></LeftSidebar>
      <section className="flex flex-1 h-full">
          <Outlet />
      </section>
      <Footer></Footer>
    </div>
  )
}

export default RootLayout
