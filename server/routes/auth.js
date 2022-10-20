import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express();

//REGISTER
router.post("/register", register);
//LOGIN
router.post("/login", login);

export default router;
