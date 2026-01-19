import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";





const SignInForm= () => {
  const[show,setShow]=useState(false)
  const navigate=useNavigate();
  const User={
    name:'',
    email:'',
    password:'',
    role:''
  }
  const[user,setUser]=useState(User)
  const handleChange=(e)=>{
    
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }))
    console.log(user.name,user.email,user.password,user.role )
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    
    console.log(user.name,user.email,user.password,user.role )
    
    axios.post('http://localhost:5000/api/v1/auth/register',user)
    .then((res)=>{
        
        toast.success(res.data.message)
        console.log(res.data.message)
        navigate('/home')

    })
    .catch((err)=>{
      toast.error(err.response.data.message)
      console.log(err)
    })
  }

    
  
  return (
  
         <div className=' h-120  w-lg mx-auto bg-linear-to-b from-cyan-50 to-cyan-200 rounded-2xl'>
         <Link to='/' >
            <button className=' mx-10 mt-5 bg-neutral-700 px-4 py-2 rounded-md text-white cursor-pointer transition duration-300 hover:bg-neutral-900'>Back</button></Link>
        
        <form onSubmit={handleSubmit} autoComplete='off'>

            <div className=''>
                <h1 className=' text-slate-500   text-4xl font-SemiBold tracking-tight  mt-10 px-10'>SignIn To New Account</h1>
                <p className='  text-lg tracking-wide px-10 py-2'>Already have an account? <a className='text-blue-600' href="/Login">LogIn</a> to your Account</p>
            </div>
            <div className='flex flex-col max-w-xs  gap-4 mt-10'>
                <input onChange={handleChange} className='px-10 mt-3 border border-neutral-700 rounded-md mx-10 shadow-sm hover:shadow-md focus:shadow-xl transition-all duration-300' name='name' id="password" type="text" placeholder='Enter Your Name' />
                <input onChange={handleChange} className='px-10 mx-10 border  border-neutral-700 rounded-md shadow-lg hover:shadow-xl focus:shadow-2xl transition-all duration-300'  type="text" name='email' placeholder='Enter Your Email' />
                <div className='relative'>
                <input onChange={handleChange} className='px-10  border border-neutral-700 rounded-md mx-10 shadow-sm hover:shadow-md focus:shadow-xl transition-all duration-300' type={show ? "text" : "password"} name='password' placeholder='Enter Your Password' />
                {!show && <IoMdEye onClick={() => setShow(!show)} className='w-[22px] h-[22px] absolute bottom-1 mt- ml-10 right-[12%]' />}
                {show && <IoIosEyeOff onClick={() => setShow(!show)} className='w-[22px] h-[22px] absolute bottom-1 mt- ml-10 right-[12%]' />}
                </div>
        <select onChange={handleChange} name='role'
        className="px-4 py-2 mx-10 rounded-lg border text-black border-gray-300 dark:border-gray-700 
                  
                   shadow-sm focus:shadow-md hover:shadow-md
                   outline-none transition-all duration-200"
      >
        <option value="">Select your role</option>
        <option value="admin">Admin</option>
        <option value="player">Player</option>
      </select>
            <button className=' mx-10 mt-5 bg-blue-500 px-4 py-2 rounded-md text-white cursor-pointer transition duration-300 hover:bg-blue-600'>Register</button>

            </div>
            
        </form>
      
    </div>
      
    
  )

}
export default SignInForm
