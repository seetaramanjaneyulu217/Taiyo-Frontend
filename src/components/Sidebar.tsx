import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate()
    
  return (
    <div className='w-1/5'>
        <ul className='flex flex-col gap-y-5'>
            <Link to='/' className='cursor-pointer'>Home</Link>
            <Link to='/contacts' className='cursor-pointer'>Contacts</Link>
            <Link to='/charts-and-maps' className='cursor-pointer'>Charts and Maps</Link>
        </ul>
    </div>
  )
}

export default Sidebar