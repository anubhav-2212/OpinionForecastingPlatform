import React, { useState } from 'react'
import LoginForm from '../components/LoginForm';


const Login = () => {
    const[email,password]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();

    }

  return (
    <>
    <div className='min-h-screen  bg-linear-to-b from-neutral-100 to-blue-200 flex justify-center items-center'>
        <LoginForm/>
    </div>
    </>
   
  )
}

export default Login
