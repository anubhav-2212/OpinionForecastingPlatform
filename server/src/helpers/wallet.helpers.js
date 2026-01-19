import Wallet from "../models/wallet.models";
//things to note down about helper functions
//they are not controllers think of them as helper functions
//no req res or next and no return status statements they only throw errors
export const addTransationToWallet=async(userId,amount,remark)=>{
   
    let wallet=await Wallet.findOne({userId})
        if(!wallet){
           throw new Error("Wallet not found")
        }
        wallet.balance+=amount;
        const transaction={
            amount,
            type:"credit",
            remark,
            createdAt:new Date()
        }
        wallet.transactions.push(transaction)
        await wallet.save()
        return wallet
    }
export const deductBalance=async(userId,amount,remark)=>{
   
    let wallet=await Wallet.findOne({userId:id})
        if(!wallet){
           throw new Error("Wallet not found")
        }
        if(wallet.balance<amount){
           throw new Error("Insufficient balance")
        }
        wallet.balance-=amount;
        const transaction={
            amount,
            type:"debit",
            remark,
            createdAt:new Date()
        }
        wallet.transactions.push(transaction)
        await wallet.save()
        return wallet
}