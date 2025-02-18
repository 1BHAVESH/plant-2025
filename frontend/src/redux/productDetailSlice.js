import {createSlice} from "@reduxjs/toolkit";

const plantInfoSlice = createSlice({
    name: "plantInfo",
    initialState:{
        plant:null,
        quentity:1
        
    },
    reducers:{
        setPlantInfo: (state, action) => {
            state.plant = action.payload
        },
        setPlantQuentity: (state, action)=> {
            state.quentity = action.payload
        }

    }

})


export const {setPlantInfo, setPlantQuentity} = plantInfoSlice.actions;
export default plantInfoSlice.reducer