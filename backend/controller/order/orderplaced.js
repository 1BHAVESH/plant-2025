// import { Plant } from "../../modals/plant.model.js";
import { User } from "../../modals/user.modal.js";

export const totalEarnings = async (req, res) => {
    try {
        console.log("Calculating total earnings...");

        // Find all users and populate the `orders` field with `Plant` schema data
        const usersWithOrders = await User.find({})
            .populate({
                path: "orders",
                select: "price name" // Only fetch price and name fields from Plant schema
            });
            

        // Calculate total earnings from all users
        let totalEarnings = 0;
        usersWithOrders.forEach(user => {
            user.orders.forEach(order => {
                totalEarnings += order.price;
            });
        });

        console.log(`Total Earnings: ${totalEarnings}`);

        return res.status(200).json({
            message: "Total earnings calculated successfully",
            success: true,
            totalEarnings
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};
