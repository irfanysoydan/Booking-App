import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/users.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express();

//UPDATE AND DELETE
router.route("/:id")
  .put(verifyAdmin, updateUser)
  .delete(verifyAdmin, deleteUser);
//GET
router.get("/find/:id", getUser);
//GET ALL
router.get("/", getAllUser);

export default router;
