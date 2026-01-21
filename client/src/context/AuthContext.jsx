import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import api from '../api/axios';


const AuthContext=createContext();

export const AuthProvider = ({children}) => {
    const[user,setUser]=useState(null);
    const[isAuth,setIsAuth]=useState(false);
    const[loading,setLoading]=useState(true);
      const fetchUser=async()=>{
            try {
                const res=await api.get("/auth/profile")
                setUser(res?.data?.user)
                console.log(res?.data?.user)
                setIsAuth(true);
            } catch (error) {
                console.log("Error Getting User",error)
                
            }
            finally{
                setLoading(false)
            }
        }

    useEffect(()=>{
        fetchUser();
    },[])


  return (
   <AuthContext.Provider value={{user,loading,isAuth,fetchUser}}>
    {children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=> useContext(AuthContext)
