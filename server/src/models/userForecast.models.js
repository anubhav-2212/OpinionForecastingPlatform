import mongoose from "mongoose";

const userForecastSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    forecastId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Prediction",
        required:true
    },
    forecastAmount:{
        type:Number,
        required:true
    },
    choice:{
        type:String,
        enum:["yes","no"],
        required:true
    },
    rewardAmount:{
        type:Number,
        default:0,
        required:true
    },
    result:{
        type:String,
        enum:['won',"lost",null],
        default:null
    }

},{timestamps:true})

 const userForecast=mongoose.model('userForecast',userForecastSchema)
 export default userForecast