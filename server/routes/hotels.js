import express from "express";
import {
  countByCity,
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  updateHotel,
} from "../controllers/hotels.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE AND GET ALL
router.route("/").post(verifyAdmin, createHotel).get(getAllHotel);
//UPDATE AND DELETE
router
  .route("/:id")
  .put(verifyUser, updateHotel)
  .delete(verifyUser, deleteHotel);
//GET
router.get("/find/:id", getHotel);
//COUNT BY CITY
router.get("/countByCity", countByCity);

export default router;
