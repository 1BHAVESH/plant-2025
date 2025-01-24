import {createSlice} from "@reduxjs/toolkit";

const plantInfoSlice = createSlice({
    name: "plantInfo",
    initialState:{
        plant:null
        
    },
    reducers:{
        setPlantInfo: (state, action) => {
            state.plant = action.payload
        }

    }

})


export const {setPlantInfo} = plantInfoSlice.actions;
export default plantInfoSlice.reducer