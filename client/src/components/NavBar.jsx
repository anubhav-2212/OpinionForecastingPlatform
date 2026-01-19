import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex justify-between items-center p-4'>
        <h2 className='font-bold text-xl bg-blue-300 rounded-xl overflow-hidden tracking-tight px-4 py-1'>Predictify</h2>
        <div className='flex gap-10 items-center '>
          <a  className='cursor-pointer hover:bg-blue-200 rounded-2xl px-4' href="">Home</a>
<Link to="/login" >
<button className='bg-blue-500 px-4 py-2 rounded-2xl text-white cursor-pointer transition duration-300 hover:bg-blue-600'>Login</button>
</Link>

          <Link to='/signin'>
          <button className='bg-blue-500 px-4 py-2 rounded-2xl text-white cursor-pointer transition duration-300 hover:bg-blue-600'>Sign IN</button></Link>
          
        </div>
      
    </div>
  )
}

export default NavBar
