import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }: any) => {
  return (
    <div className='flex xs:flex-col md:flex-row'>
        <Sidebar/>
        <div className='w-full md:w-4/5'>
            {children}
        </div>
    </div>
  )
}

export default Layout