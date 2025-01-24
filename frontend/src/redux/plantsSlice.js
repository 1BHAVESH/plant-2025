import {createSlice} from "@reduxjs/toolkit";


const plantSlice = createSlice({
    name: "Plant",
    initialState:{
        plants: [],
        
    },
    reducers:{
        setPlants: (state, action) => {
            state.plants = action.payload
        },

        
    }
})

export const {setPlants} = plantSlice.actions;
export default plantSlice.reducer