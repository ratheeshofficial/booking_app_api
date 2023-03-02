import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    let isEmailExist = await User.findOne({
      email: req.body.email,
    });
    console.log("isEmailExist", isEmailExist);

    if (isEmailExist) {
      res.status(500).json({ success: false, message: "email already exist" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      await newUser.save();
      res.status(200).json({ success: true, newUser });
    }
  } catch (error) {
    res.status(500).json(error);
  }

  // res.send("Hello this is register endpoint");
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("user not found");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json("Wrong password or username");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    // console.log("password", otherDetails);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails, isAdmin } });
  } catch (error) {
    res.status(500).json(error);
  }
};
