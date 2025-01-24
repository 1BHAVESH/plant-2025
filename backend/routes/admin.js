import express from "express"
import { isAuthnticated } from "../middlewere/isAuthnticated.js";
import { totalEarnings } from "../controller/order/orderplaced.js";


const router = express.Router();

router.route("/total-earnings").get(isAuthnticated, totalEarnings)

export default router; 