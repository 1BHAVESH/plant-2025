import { setLoader } from "@/redux/loaderSlice.js"
import { setPlants } from "../redux/plantsSlice.js"
import axios from "axios"
import { useEffect } from "react"
import { Audio } from 'react-loader-spinner'
import { useDispatch } from "react-redux"

export const useGetAllPlants = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchPlants = async() => {

            try {
               
                 const res = await axios.get("http://localhost:3001/api/v1/plant/plants", {withCredentials: true})
                // const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/api/v1/plant/plants`, {withCredentials: true})
                
                if(res.data.success){

                    console.log(res)

                    dispatch(setPlants(res.data.plants))
                 }
                
            } catch (error) {
                console.log(error)
            }
        }

        fetchPlants()

    }, [])
}