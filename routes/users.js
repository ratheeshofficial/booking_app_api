import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifytoken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifytoken, (req, res) => {
  res.send("hello user you are logged in"); //checking purpose
});

router.get("/checkuser/:id", verifyUser, (req, res) => {
  res.send("hello user you are logged in and you can delete your account"); //checking purpose
});

router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
  res.send("hello Admin you are logged in and you can delete all account"); //checking purpose
});

// router.get("/checkuser/:id", verifyUser, (req, res) => {
//   res.send("hello user you are logged in and delete account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
//   res.send("hello Admin you are logged in and delete all account");
// });

// UPDATE

router.put("/:id", verifyUser, updateUser);

// DELETE

router.delete("/:id", deleteUser);

// GET

router.get("/:id", verifyUser, getUser);

// GETALL

router.get("/", getUsers);

export default router;
