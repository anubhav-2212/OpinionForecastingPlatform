import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import api from '../api/axios';


const AuthContext=createContext();
const WAS_LOGGED_IN_KEY = "wasLoggedIn";

export const AuthProvider = ({children}) => {
    const[user,setUser]=useState(null);
    const hasVisited = localStorage.getItem(WAS_LOGGED_IN_KEY) === "true";
    const[isAuth,setIsAuth]=useState(hasVisited);
    const[loading,setLoading]=useState(!hasVisited);
      const setAuthenticatedUser=(nextUser)=>{
            setUser(nextUser)
            setIsAuth(true)
            setLoading(false)
            localStorage.setItem(WAS_LOGGED_IN_KEY, "true")
        }
      const fetchUser=async({showLoader=false} = {})=>{
            if(showLoader){
                setLoading(true)
            }
            try {
                const res=await api.get("/auth/profile")
                setAuthenticatedUser(res?.data?.User)
            } catch (error) {
                console.log("Error Getting User",error)
                setUser(null)
                setIsAuth(false)
                localStorage.removeItem(WAS_LOGGED_IN_KEY)
            }
            finally{
                setLoading(false)
            }
        }
        const logout=async()=>{
            try {
                await api.post('/auth/logout')
              
            } catch (error) {
                console.error("Error logging out user",error)
                
            }
            finally{
               setUser(null)
               setIsAuth(false)
               localStorage.removeItem(WAS_LOGGED_IN_KEY)
            }
        }

    useEffect(()=>{
        if(hasVisited){
            fetchUser();
            return;
        }

        setLoading(false);
    },[])

  


  return (
   <AuthContext.Provider value={{user,loading,isAuth,fetchUser,logout,setAuthenticatedUser}}>
    {children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=> useContext(AuthContext)
