import { Plant } from "../../modals/plant.modal.js";


export const getPlantDetail = async(req, res) => {

   try {
    const plantId = req.params.id;

    console.log(plantId)

    const plant = await Plant.findById(plantId);

    if(!plant){
        return res.status(404).json({
            message: "Plant not found",
            success: false
        });
    }

    // console.log(plant)
    
    return res.status(200).json({
        plant,
        success:true
    })
   } catch (error) {
    console.log(error)
   }

}