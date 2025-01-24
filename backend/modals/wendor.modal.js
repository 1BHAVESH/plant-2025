import mongoose, { Mongoose } from "mongoose";

const wendorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    aadahrNo: {
        type: Number,
        required: true,
      
    },
    userInfo: {
         type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  
   
    
},{timestamps: true})


export const Wendor = mongoose.model("Wendor", wendorSchema);