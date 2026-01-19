import mongoose from "mongoose";

const walletSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        default:0
    },
    transactions:[
        {amount:Number,
        type:{
        type:String,
        enum:['credit','debit']
    },
    remark:String,
    createdAt:{type:Date,default:Date.now}


        }
    ]

},
{Timestamps:true}
)
const Wallet=mongoose.model("wallet",walletSchema)
export default Wallet