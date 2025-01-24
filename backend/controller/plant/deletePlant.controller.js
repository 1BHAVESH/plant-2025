import { Plant } from "../../modals/plant.modal.js";
import { User } from "../../modals/user.modal.js";

export const deletePost = async(req, res) => {

    try {

        const userId = req.id;
        const plantId = req.params.id;
        
        const plant = await Plant.findById(plantId);

        if(!plant) return res.status(403).json({message:'plant not found'});

        if(plant.owner.toString() !== userId) return res.status(403).json({message:'Unauthorized'});

        await Plant.findByIdAndDelete(plantId);

        const user = await User.findById(userId)

        user.ownPlant = user.ownPlant.filter(id => id.toString() !== plantId)

        user.orders = user.orders.filter(id => id.toString() !== plantId)

        user.cart = user.cart.filter(id => id.toString() !== plantId)


        await user.save()

        return res.status(200).json({
            success:true,
            message:'Post deleted'
        })


    } catch (error) {
        console.log(error)
    }
}