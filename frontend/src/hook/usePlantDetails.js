import { setPlantInfo } from "../redux/productDetailSlice.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useplantData = (id) => {
  
    const dispatch = useDispatch()

    console.log(id)

    useEffect(() => {
        const  fetchData = async() => {
            console.log("vhjebbbbbbbkjfbjkdbfkjd")
            console.log(id)
            try {
                console.log(id)
                 const response = await axios.get(`http://localhost:3001/api/v1/plant/${id}/plant_detail`, {withCredentials: true});

                //const response = await axios.get(`https://plant-2yxz.onrender.com/api/v1/plant/${id}/plant_detail`, {withCredentials: true});
                
                console.log(response)
                dispatch(setPlantInfo(response.data.plant))
            } catch (error) {
                console.error("Error fetching data:", error);
            }
 
                  }
        
        fetchData();
    }, [id])

}