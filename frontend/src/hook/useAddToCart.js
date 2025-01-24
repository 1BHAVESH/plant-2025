import { setCart } from "@/redux/cartSlice.js";
import { setUser } from "../redux/userSlice.js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useAddToCart = (id) => {

    const dispatch = useDispatch()
    

    const addToCart = async () => {
        try {
            console.log(id);

            const res = await axios.get(`http://localhost:3001/api/v1/buy_or_cart/${id}/add_to_cart`, { withCredentials: true });

            // const res = await axios.get(`https://plant-2yxz.onrender.com/api/v1/buy_or_cart/${id}/add_to_cart`, { withCredentials: true });


            console.log(res);

            dispatch(setUser(res.data.user))

            console.log(res.data.user.cart)

            dispatch(setCart(res.data.user.cart))
           
        } catch (error) {
            console.log(error);
        }
    };

    // `addToCart` function ko return karna yahan zaroori hai
    return { addToCart };
};
