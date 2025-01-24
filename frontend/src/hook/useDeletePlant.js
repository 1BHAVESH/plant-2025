import { setCart } from "@/redux/cartSlice.js";
import { setUser } from "../redux/userSlice.js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOwnPlansts } from "@/redux/ownPlantSlice.js";
import { setPlants } from "@/redux/plantsSlice.js";
import ProductCard from "@/components/Home/ProductCard.jsx";

export const useDeletePlant = (id) => {

    const dispatch = useDispatch()

    const {OwnPlant} = useSelector(store => store.ownPlants)
    const {plants} = useSelector(store => store.plants)


    // console.log(OwnPlant)
    

    const deletePlant = async () => {
        try {
            // console.log(id);

             const res = await axios.delete(`http://localhost:3001/api/v1/plant/${id}/delete`, { withCredentials: true });

            //const res = await axios.delete(`https://plant-2yxz.onrender.com/api/v1/plant/${id}/delete`, { withCredentials: true });

            // console.log(res);

            if(res.data.success){
                const updatedPlants = OwnPlant.filter((item) => item._id !== id)

                // console.log(updatedPlants)

                dispatch(setOwnPlansts(updatedPlants))
                dispatch(setPlants(updatedPlants))
               
            }

           

           
           
        } catch (error) {
            console.log(error);
        }
    };

    // `deletePlant` function ko return karna yahan zaroori hai
    return { deletePlant };
};
