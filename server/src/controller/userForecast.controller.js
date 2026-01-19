import userForecast from "../models/userForecast.models.js";
import Prediction from "../models/prediction.models.js";
import Wallet from "../models/wallet.models.js";



export const submitForecast=async(req,res)=>{
    try {
        const userId=req.user.id
        const{forecastId}=req.params
        const{choice,forecastAmount}=req.body
        console.log(choice,forecastAmount,forecastId)
        //basic validation
        if(!choice||!forecastAmount){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //validation on forecast amount type 
        const amount=Number(forecastAmount)
        if(Number.isFinite(amount)||amount<0){
             return res.status(400).json({
                success:false,
                message:"forecast amount must be greater than"
            })
        }


       
        //validation on choice enum
        if(!['yes','no'].includes(choice)){
            return res.status(400).json({
                success:false,
                message:"Choice should be either yes or no"
            })
        }

        //check whether the forecast/prediction exist or not
        const forecast=await Prediction.findById(forecastId)
        if(!forecast){
            return res.status(400).json({
                success:false,
                message:"Forecast doesn't exist"
            })
        }
        //find the user wallet
        const wallet=await Wallet.findOne({userId})
        if(!wallet || wallet.balance<amount){
            return res.status(400).json({
                success:false,
                message:'Insufficient wallet funds'
            })
        }
        //check if forecast is live
        const now=new Date();
        if(now<forecast.startTime||now>forecast.endTime){
            return res.status(400).json({
                success:false,
                message:"Forecast is not live"
            })
        }
          const existingForecast=await userForecast.findOne({userId,forecastId})
        if(existingForecast){
            return res.status(400).json({
                success:false,
                message:"Forecast already done"
            })
        }
        //check if the result is pending aur not
        if(forecast.result!==null){
            return res.status(400).json({
                success:false,
                message:"Result is already declared"
            })
        }
        wallet.balance-=amount
        await wallet.save()
      

        const submittedForecast=await userForecast.create({
            userId,
            forecastId,
            choice,
            amount,

        })
        if(choice=='yes'){
            forecast.totalYesStake+=amount
            forecast.yesVotes+=1
        }
        else if(choice=='no'){
            forecast.totalNoStake+=amount
            forecast.noVotes+=1
        }
        await forecast.save()
        res.status(200).json({
            success:true,
            forecast:submittedForecast,
            message:"Forecast Submitted successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })

        
    }
}
export const getForecastHistory=async(req,res)=>{
    const{userId}=req.user.id
    try {
        const history=await userForecast.find({userId})
        . populate('forecastId',"question category startTime endTime result")
        .sort({createdAt:-1})

        return res.status(200).json({
            success:true,
            count:history.length,
            data:history
        })
       
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
        
    }
}