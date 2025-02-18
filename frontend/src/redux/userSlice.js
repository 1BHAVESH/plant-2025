import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "User",
    initialState:{
        user: null,
        isAuthnicated: false
        
    },
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuthnicated = true
        },

        setLogout: (state) => {
            state.user = null
            state.isAuthnicated = false
            
        }

        
    }
})

export const {setUser, setLogout} = userSlice.actions;
export default userSlice.reducer