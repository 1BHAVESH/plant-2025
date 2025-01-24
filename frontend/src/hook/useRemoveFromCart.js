import { setCart } from "@/redux/cartSlice.js";
import { setUser } from "../redux/userSlice.js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useRemoveFromCart = (id) => {

    const dispatch = useDispatch()

    const removeFromCart = async () => {
        try {
            console.log(id);

             const res = await axios.get(`http://localhost:3001/api/v1/buy_or_cart/${id}/remove_from_cart`, { withCredentials: true });

             // const res = await axios.get(`https://plant-2yxz.onrender.com/api/v1/buy_or_cart/${id}/remove_from_cart`, { withCredentials: true });

            console.log(res);

            dispatch(setUser(res.data.user))

            console.log(res.data.user.cart)

            dispatch(setCart(res.data.user.cart))
           
        } catch (error) {
            console.log(error);
        }
    };

    // `removeFromCart` function ko return karna yahan zaroori hai
    return { removeFromCart };
};
