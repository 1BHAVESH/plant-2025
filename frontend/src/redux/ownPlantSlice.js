import {createSlice} from "@reduxjs/toolkit";


const ownPlantSlice = createSlice({
    name: "OwnPlants",
    initialState:{
        OwnPlant: [],
        
    },
    reducers:{
        setOwnPlansts: (state, action) => {
            state.OwnPlant = action.payload
        },

        
    }
})

export const {setOwnPlansts} = ownPlantSlice.actions;
export default ownPlantSlice.reducer