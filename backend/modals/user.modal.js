import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        
    },
    orders : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant"
    }],
    orderID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],

    cart: [{
         type: mongoose.Schema.Types.ObjectId,
        ref: "Plant"
    }],

    ownPlant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant"
    }]
    
},{timestamps: true})


export const User = mongoose.model("User", userSchema);