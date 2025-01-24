import express from "express"
import { isAuthnticated } from "../middlewere/isAuthnticated.js";
import { createPlantPost } from "../controller/plant/plant.controller.js";
import upload from "../middlewere/multer.js";
import { editPlant } from "../controller/plant/editPlant.controller.js";
import { deletePost } from "../controller/plant/deletePlant.controller.js";
import { showPlants } from "../controller/plant/showPlants.controller.js";
import { getPlantDetail } from "../controller/plant/plantDetails.js";
import { usersOwnPlants } from "../controller/plant/userOwnPLants.controller.js";

const router = express.Router();

router.route("/create_plant").post(isAuthnticated,  upload.single("image"), createPlantPost);
router.route("/:id/edit").post(isAuthnticated, upload.single("image"), editPlant)
router.route("/:id/delete").delete(isAuthnticated, deletePost)
router.route("/plants").get(isAuthnticated, showPlants)
router.route("/:id/plant_detail").get( getPlantDetail)
router.route("/my_plants").get(isAuthnticated, usersOwnPlants)

export default router; 