import Wallet from "../models/wallet.models.js";

export const getwallet=async(req,res)=>{
    try {
        const wallet=await Wallet.findOne({userId:req.user.id})
        if(!wallet){
            return res.status(400).json({
                success:false,
                message:"Wallet not found"
            })
        }
        return res.status(200).json({
            success:true,
            wallet
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}