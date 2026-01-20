import React from 'react'


import { Link } from 'react-router-dom'
import LandingPageNavBar from '../components/LandingPageNavBar'


 const LandingPage = () => {
  return (
    <div className='min-h-screen bg-linear-to-b from-neutral-100 to-blue-200 '>
      <LandingPageNavBar/>
       <div className='flex-col justify-center items-center '>
        <Link to='/signin'><p className='text-center text-slate-600 border-3 border-slate-400 shadow-lg w-fit rounded-2xl  text-lg  tracking-tight max-w-2xl mx-auto px-4 py-2 mt-20 hover:shadow-2xl hover:scale-105 transition-all duration-300'>SignIn and Win 100 Coins </p></Link>
        <h1 className=' text-center text-4xl font-bold  tracking-tight max-w-sm mx-auto mt-10 bg-linear-to-b from-neutral-700 to-blue-400 bg-clip-text text-transparent
        my-10'>
            Unlease The Power of Opinion Forecasting</h1>
      <p className='text-center font-semibold text-lg mt-10 tracking-tight max-w-3xl mx-auto text-slate-600 leading-5'>
        Predictify is a decision accuracy tracking platform where users forecast real-world events, allocate virtual credits, and improve analytical skills through performance insights.. 

      </p>

    </div>
      
        <img className='mt-20 max-w-200 mx-auto  border-gray-500 shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300' src="/poster1.png" alt="poster1" />
    </div>
  )
}

export default LandingPage