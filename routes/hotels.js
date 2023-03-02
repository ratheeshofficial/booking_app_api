import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE

router.post("/", createHotel); //verifyAdmin is a middleware

// UPDATE

router.put("/:id", verifyAdmin, updateHotel);

// DELETE

router.delete("/:id", deleteHotel);

// GET

router.get("/find/:id", getHotel);

// GETALL

router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
