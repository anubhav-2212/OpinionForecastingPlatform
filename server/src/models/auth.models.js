import mongoose from "mongoose";



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        length:{min:3,max:20}
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        lowercase:true
    
    },
    password:{
        type:String,
        required:true,
        minlength:[4,'Password must be at least 6 characters long'],

    },
    role:{
        type:String,
        enum:['player','admin'],
        default:'player'
    }   
})

const User=mongoose.model('User',userSchema);
export default User