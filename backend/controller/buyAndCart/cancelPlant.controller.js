import { Plant } from "../../modals/plant.modal.js";
import { User } from "../../modals/user.modal.js";

export const cancelOrder = async (req, res) => {
  try {
    const userId = req.id;  // Assuming user id is in req.id
    const plantId = req.params.id;

    // console.log(userId, plantId)

    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({
        message: "Plant not found",
        success: false
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    user.orders = user.orders.filter(id => id.toString() !== plant._id.toString())

    await user.save();

    const populateOrder = await Promise.all(
      user.orders.map(async (orderId) => {
          const plant = await Plant.findById(orderId);

          if(plant) {
              return plant
          }

          return null
      } )
  )

    return res.status(200).json({
      message: "your order is canceld",
      success: true,
      user,
      orders: populateOrder
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};
