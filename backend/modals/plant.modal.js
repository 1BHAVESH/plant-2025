import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["flower", "indoorplant", "outdoorplant"], // Corrected enum values
        required: true,
    },
    description:{
        type:String,
       
    },
    price: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

export const Plant = mongoose.model("Plant", plantSchema);
