import { Plant } from "../../modals/plant.modal.js"


export const showPlants = async(req, res) => {

    try {

        const plants = await Plant.find()

        return res.status(200).json({
            mesaage:"feed posts",
            plants,
            success:true
           
        })
        
    } catch (error) {
        console.log(error)
    }

}