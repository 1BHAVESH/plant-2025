import {createSlice} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "Orders",
    initialState:{
        orders: [{}],
        order: false
        
    },
    reducers:{
        setOrders: (state, action) => {
            state.orders = action.payload
        },
        setOrder: (state, action) => {
            state.order = action.payload
        },

        
    }
})

export const {setOrders, setOrder} = cartSlice.actions;
export default cartSlice.reducer