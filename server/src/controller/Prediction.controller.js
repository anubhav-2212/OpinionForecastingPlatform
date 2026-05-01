import Prediction from "../models/prediction.models.js";
import User from "../models/auth.models.js";
import userForecast from "../models/userForecast.models.js";
import Wallet from "../models/wallet.models.js";


export const createPrediction=async(req,res)=>{
    const{question,category,startTime,endTime}=req.body

    if(!question || !category || !startTime || !endTime){
        return res.status(400).json({
            success:false,
            message:"All fields are required"})
    }
    try {
         if(new Date(startTime)>=new Date(endTime)){
        return res.status(400).json({
            message:"Start time should be less than end time"})
        }

        const prediction=await Prediction.create({
            question,
            category,
            startTime,
            endTime,
            createdBy:req.user._id  
        })
        if(!prediction){
            return res.status(400).json({
                success:false,
                message:"Prediction not created"})
        }
        res.status(200).json({
            success:true,
            message:"Prediction created successfully",
            Prediction:{
                prediction
            },
            user:req.user
  
         
        })

    
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong"})
        
    }
   
}
export const getPrediction=async(req,res)=>{
    const{status}=req.query;
    const now=new Date();
    let filter={}

    if (status=="live"){
        filter={
            startTime:{$lte:now},
            endTime:{$gte:now},
            result:"pending"
        }
    }
    else if(status=="upcoming"){
        filter={
            startTime:{$gte:now},
            result:"pending"
        }
    }
    else if(status=="closed"){
        filter={
            endTime:{$lte:now},
            result:"pending"
        }
    }
    else if (status=="settled"){
        filter={
            result:{$in:["yes","no"]}
        }
    }
    else{
        filter={
            result:{$in:["pending","yes","no"]}
        }

    }
    
    //Prediction.find never returns null it returns empty array
    // if(!prediction){
    //     return res.status(400).json({
    //         success:false,
    //         message:"Prediction not found"})
    // }
    const predictions = await Prediction.find(filter).sort({ startTime: 1 });

    

  const responseWithStatus=predictions.map(p=>{
    let statusValue="upcoming"
    if(["yes","no"].includes(p.result)) statusValue="settled"
    else if(p.startTime>now) statusValue="upcoming"
    else if(p.startTime<=now && now<=p.endTime) statusValue="live"
    else if(p.endTime<now) statusValue="closed"

    return{
        ...p.toObject(),
        status:statusValue
    };

  })

    res.status(200).json({
        success:true,
        message:predictions.length ? "Prediction found successfully" : "No predictions found",
        count:predictions.length,
        data:responseWithStatus
    })
    

}
export const getPredictionById=async(req,res)=>{
    const{id}=req.params
    console.log(id)
    const now=new Date();

    const prediction=await Prediction.findById(id)
    if(!prediction){
        return res.status(400).json({
            success:false,
            message:"Invalid Id"
        })
    }
    let statusValue="upcoming"
    if (["yes","no"].includes(prediction.result)) statusValue="settled"
    else if (prediction.startTime>now) statusValue="upcoming"
    else if(prediction.startTime<= now && prediction.endTime>= now) statusValue="live"
    else if(prediction.endTime<now) statusValue="closed"

    

    res.status(200).json({
        success:true,
        message:"got Prediction by id ",
        count:prediction.length,
        data:{...prediction.toObject(),
            status:statusValue
        }


    })
}
export const deletePrediction=async(req,res)=>{
    const{id}=req.params
    const prediction=await Prediction.findByIdAndDelete(id)
    if(!prediction){
        return res.status(400).json({
            success:false,
            message:"Invalid Id"
        })
    }
    res.status(200).json({
        success:true,
        message:"Prediction deleted successfully"
    })
}
export const setPredictionResult=async(req,res)=>{
    const{forecastId}=req.params
    const{result}=req.body
    try {
        if(!forecastId){
            return res.status(400).json({
                success:false,
                message:"Invalid Id"
            })
        }
        if(!['yes','no'].includes(result)){
            return res.status(400).json({
                success:false,
                message:"result not recieved"
            })
        }
        const forecast=await Prediction.findById(forecastId)
        if(!forecast){
            return res.status(400).json({
                success:false,
                message:"Forecast not found"
            })
        }
        if(forecast.result!=="pending"){
            return res.status(400).json({
                success:false,
                message:"Result Already Declared"
            })
        }
        forecast.result=result
        await forecast.save();

        const userForecasts=await userForecast.find({forecastId})
        if(!userForecasts.length){
            return res.status(400).json({
                success:false,
                message:"No users Predicted"
            })
        }
        for(const uf of userForecasts){
            if(uf.choice === result){
                uf.result="won"
                uf.rewardAmount=uf.forecastAmount*2
                const wallet=await Wallet.findOne({userId:uf.userId})
                if(wallet){
                    wallet.balance+=uf.rewardAmount
                    await wallet.save();
                }
                
            }
            else{
                    uf.result='lost'
                    uf.rewardAmount=0

                }
            await uf.save();

            }
            res.status(200).json({
                success:true,
                message:"Forecast Settled Successfully"
            })

        }


        
    catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })

        
    }

    

}
