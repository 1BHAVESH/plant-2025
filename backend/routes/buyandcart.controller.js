import express from "express"
import { isAuthnticated } from "../middlewere/isAuthnticated.js";
import { getCart } from "../controller/buyAndCart/cart.controller.js";
import { removeFromCart } from "../controller/buyAndCart/removeFromCart.controller.js";
import { buyPlant } from "../controller/buyAndCart/buyPlant.controller.js";
import { cancelOrder } from "../controller/buyAndCart/cancelPlant.controller.js";

const router = express.Router();

router.route("/:id/add_to_cart").get(isAuthnticated, getCart)
router.route("/:id/remove_from_cart").get(isAuthnticated, removeFromCart)
router.route("/:id/plant_buy").get(isAuthnticated, buyPlant)
router.route("/:id/cancel_order").get(isAuthnticated, cancelOrder)

export default router; 