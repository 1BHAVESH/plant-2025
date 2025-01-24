import express from "express"
import { login, regisetr } from "../controller/user.controller.js";

const router = express.Router();

router.route("/register").post(regisetr)
router.route("/login").post(login)

export default router;