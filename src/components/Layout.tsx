import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }: any) => {
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='w-4/5'>
            {children}
        </div>
    </div>
  )
}

export default Layout