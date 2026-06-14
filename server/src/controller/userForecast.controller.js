import userForecast from "../models/userForecast.models.js";
import Prediction from "../models/prediction.models.js";
import Wallet from "../models/wallet.models.js";



export const submitForecast=async(req,res)=>{
    try {
        const userId=req.user.id
        const{forecastId}=req.params
        const{choice,forecastAmount}=req.body
        //basic validation
        if(!choice||!forecastAmount){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //validation on forecast amount type 
        const amount=Number(forecastAmount)
        if(!Number.isFinite(amount) || amount<=0){
             return res.status(400).json({
                success:false,
                message:"Forecast amount must be greater than 0"
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
        if(forecast.result!=="pending"){
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
            forecastAmount: amount,

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
    try {
        const userId=req.user.id
        const history=await userForecast.find({userId})
        .populate('forecastId',"question category startTime endTime result")
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

export const getForecastAnalytics=async(req,res)=>{
    try {
        const userId=req.user.id
        const forecasts=await userForecast.find({userId}).sort({createdAt:-1})

        const summary=forecasts.reduce((acc,item)=>{
            const stake=Number(item.forecastAmount) || 0
            const reward=Number(item.rewardAmount) || 0

            acc.totalForecasts+=1
            acc.totalStaked+=stake

            if(item.result==="won"){
                acc.wonForecasts+=1
                acc.settledForecasts+=1
                acc.totalWon+=Math.max(reward-stake,0)
            }
            else if(item.result==="lost"){
                acc.lostForecasts+=1
                acc.settledForecasts+=1
                acc.totalLost+=stake
            }
            else{
                acc.pendingForecasts+=1
            }

            return acc
        },{
            totalForecasts:0,
            settledForecasts:0,
            wonForecasts:0,
            lostForecasts:0,
            pendingForecasts:0,
            totalStaked:0,
            totalWon:0,
            totalLost:0
        })

        const totalScore=summary.settledForecasts
            ? Math.round((summary.wonForecasts/summary.settledForecasts)*100)
            : 0

        return res.status(200).json({
            success:true,
            data:{
                ...summary,
                totalScore,
                netProfitLoss:summary.totalWon-summary.totalLost
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
