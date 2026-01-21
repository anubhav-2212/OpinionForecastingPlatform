import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api/axios";

const useWallet = () => {
    const [wallet, setWallet] = useState(null);
    const[loading,setLoading]=useState(true)
    useEffect(()=>{
        const fetchWallet=async()=>{
            try {
                const res=await api.get('/wallet/balance')
                setWallet(res?.data?.data?.balance)

                
            } catch (error) {
                console.log("Falled to fetch wallet",error)
                
            }
            finally{
                setLoading(false)
            }
        }
        fetchWallet();
        
    },[])
    return {wallet,loading}
}
export default useWallet