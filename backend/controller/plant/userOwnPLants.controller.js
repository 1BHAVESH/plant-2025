import { Plant } from "../../modals/plant.modal.js"
import { User } from "../../modals/user.modal.js"


export const usersOwnPlants = async(req, res) => {
    try {

        const userId = req.id

        console.log(userId)

        // const user = await User.findById(userId).populate({path: "ownPlant", createdAt:-1})

        const user = await User.findById(userId)

        const ownPlants = await Promise.all(
            user.ownPlant.map(async (id) => {
                const plant = await Plant.findById(id);
      
                if(plant) {
                    return plant
                }
      
                return null
            } )
        )

        return res.status(200).json({
            ownPlants,
            success:true
        })
        
    } catch (error) {
        console.log(error)
    }
}