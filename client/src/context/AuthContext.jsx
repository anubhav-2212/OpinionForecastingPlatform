import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';

const AuthContext=createContext();

const AuthProvider = ({childern}) => {
    const[user,setUser]=useState(null);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const res=await api.get("/auth/profile")
                setUser(res.data.user)
            } catch (error) {
                console.log("Error Getting User",error)
                
            }
            finally{
                setLoading(false)
            }
        }
        fetchUser();

        
    },[])


  return (
   <AuthContext.Provider value={{user,loading,isAuth:!!user}}>
    {childern}
    </AuthContext.Provider>
  )
}

export const useAuth=()=> useContext(AuthContext)
