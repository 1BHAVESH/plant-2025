import { setOrders } from "@/redux/ordersSlice"
import { setUser } from "@/redux/userSlice"
import axios from "axios"
import { useDispatch } from "react-redux"

export  const useBuyPlant = (id) => {

    const dispatch = useDispatch()
 
   const buyPlant = async() => {
    try {

         const res = await axios.get(`http://localhost:3001/api/v1/buy_or_cart/${id}/plant_buy`, {withCredentials: true})

        // const res = await axios.get(`https://plant-2yxz.onrender.com/api/v1/buy_or_cart/${id}/plant_buy`, {withCredentials: true})
    
    //orders
          
           console.log(res)
    
           if(res.data.success){
    
            dispatch(setOrders(res.data.orders))
            dispatch(setUser(res.data.user))
            
           }
    
    
        
       } catch (error) {
        console.log(error)
       }
   }

   return {buyPlant}
}