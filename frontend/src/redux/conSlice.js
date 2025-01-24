import {createSlice} from "@reduxjs/toolkit";


const conSlice = createSlice({
    name: "Con",
    initialState:{
        con: false,
        category: ""
        
    },
    reducers:{
        setCond: (state, action) => {
            state.con = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        }

        
    }
})

export const {setCond, setCategory} = conSlice.actions;
export default conSlice.reducer