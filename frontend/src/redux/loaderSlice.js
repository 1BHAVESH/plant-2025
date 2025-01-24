import {createSlice} from "@reduxjs/toolkit";


const loaderSlice = createSlice({
    name: "Load",
    initialState:{
        load: false,
        
    },
    reducers:{
        setLoader: (state, action) => {
            state.load = action.payload
        },

        
    }
})

export const {setLoader} = loaderSlice.actions;
export default loaderSlice.reducer