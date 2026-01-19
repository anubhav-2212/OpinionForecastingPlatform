import React from 'react'
import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'

 const LandingPage = () => {
  return (
    <div className='min-h-screen bg-linear-to-b from-neutral-100 to-blue-200 '>
      <NavBar/>
      <HeroSection/>
        <img className='mt-20 max-w-200 mx-auto  border-gray-500 shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300' src="/poster1.png" alt="poster1" />
    </div>
  )
}

export default LandingPage