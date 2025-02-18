import express from "express"
import { login, Logout, regisetr } from "../controller/user.controller.js";

const router = express.Router();

router.route("/register").post(regisetr)
router.route("/login").post(login)
router.route("/logout").get(Logout)

export default router;