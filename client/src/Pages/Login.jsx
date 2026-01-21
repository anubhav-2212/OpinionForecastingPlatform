import React, { useState ,} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link,  useNavigate } from 'react-router-dom';
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useAuth } from '../context/AuthContext';




const Login = () => {
     const[show,setShow]=useState(false)
     const{fetchUser}=useAuth();
    const navigate=useNavigate();
    const User={
        email:"",
        password:""
    }
    const[user,setuser]=useState(User);
    const handleChange=(e)=>{
        setuser((prevUser)=>({
            ...prevUser,
            [e.target.name]:e.target.value

        }))
        console.log(user.email,user.password)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/api/v1/auth/login',user,
            {
        withCredentials: true
    })
        .then(async(res)=>{
            console.log(res?.data?.message)
            toast.success(res?.data?.message)
              navigate('/home')
            await fetchUser();
          
          
        })
       .catch((err) => {
    console.log("FULL ERROR:", err);
       

    if (err.response) {
        // backend error (wrong password, user not found, etc.)
        toast.error(err.response.data?.message || "Login failed");
    } 
    else if (err.request) {
        // request made but no response (CORS / server down)
        toast.error("Server not responding. Please try again later.");
    } 
    else {
        // something else
        toast.error(err.message || "Something went wrong");
    }
  })
}

  return (
    <>
    <div className='min-h-screen  bg-linear-to-b from-neutral-100 to-blue-200 flex justify-center items-center'>
        
         <div className=' h-100  w-lg mx-auto bg-linear-to-b from-cyan-50 to-cyan-200 rounded-2xl'>
            <Link to='/' >
            <button className=' mx-10 mt-5 bg-neutral-700 px-4 py-2 rounded-md text-white cursor-pointer transition duration-300 hover:bg-neutral-900'>Back</button></Link>
        <form onSubmit={handleSubmit}>
            <div className=''>
                <h1 className=' text-slate-500   text-4xl font-SemiBold tracking-tight  mt-10 px-10'>Login To Your Account</h1>
                <p className='  text-lg tracking-wide px-10 py-2'>Don't have an account? <a className='text-blue-600' href="/Signin">SignIn</a> to your Account</p>
            </div>
            <div className='flex flex-col max-w-xs  gap-4 mt-10'>
                
                <input onChange={handleChange} name='email' className='px-10 mx-10 border  border-neutral-700 rounded-md shadow-lg hover:shadow-xl focus:shadow-2xl transition-all duration-300' id="email" type="text" placeholder='Enter Your Email' />
               <div className='relative'>
                               <input onChange={handleChange} className='px-10  border border-neutral-700 rounded-md mx-10 shadow-sm hover:shadow-md focus:shadow-xl transition-all duration-300' type={show ? "text" : "password"} name='password' placeholder='Enter Your Password' />
                               {!show && <IoMdEye onClick={() => setShow(!show)} className='w-[22px] h-[22px] absolute bottom-1 mt- ml-10 right-[12%] cursor-pointer' />}
                               {show && <IoIosEyeOff onClick={() => setShow(!show)} className='w-[22px] h-[22px] absolute bottom-1 mt- ml-10 right-[12%] cursor-pointer' />}
                               </div>
            <button className=' mx-10 mt-5 bg-blue-500 px-4 py-2 rounded-md text-white cursor-pointer transition duration-300 hover:bg-blue-600'>Login</button>

            </div>
            
        </form>
      
    </div>
    </div>
    </>
   
  )

}

export default Login
