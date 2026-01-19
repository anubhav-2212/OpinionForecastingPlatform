import jwt from "jsonwebtoken";
const userMiddleware = (req, res, next) => {
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded)
        //decoded has id stored in it
        if(!decoded){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"})
        }
        req.user=decoded
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success:false,
            message:"Unauthorized"})
        
    }
    
}
export default userMiddleware