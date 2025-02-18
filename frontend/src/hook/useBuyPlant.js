import { setOrders } from "@/redux/ordersSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export const useBuyPlant = (id) => {
    const { quentity } = useSelector((store) => store.plantInfo); // Access the quantity from the Redux store
  
    const dispatch = useDispatch();
  
    const buyPlant = async ({formData}) => {

        console.log("ooooooooooo",formData)

        const info = {
            ...formData,
            quantity: quentity
        }
      try {
        console.log("Plant ID:", id);
        console.log("Quantity:", quentity);
  
        // Send quantity as a query parameter
        const res = await axios.post(`http://localhost:3001/api/v1/buy_or_cart/${id}/plant_buy`, info, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
  
        console.log(res);
  
        if (res.data.success) {
          dispatch(setOrders(res.data.orders));
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return { buyPlant };
  };
  