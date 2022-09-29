import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/users.js";

const router = express();

//UPDATE
router.put("/:id", updateUser);
//DELETE
router.delete("/:id", deleteUser);
//GET
router.get("/find/:id", getUser);
//GET ALL
router.get("/", getAllUser);

export default router;
