import {createSlice} from "@reduxjs/toolkit";


const editSlice = createSlice({
    name: "Edit",
    initialState:{
        edit: null,
        
    },
    reducers:{
        setEdit: (state, action) => {
            state.edit = action.payload
        },

        
    }
})

export const {setEdit} = editSlice.actions;
export default editSlice.reducer