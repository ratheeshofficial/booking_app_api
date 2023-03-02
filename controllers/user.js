import User from "../models/User.js";

// export const createUser = async (req, res) => {
//   const newUser = new User(req.body);

//   try {
//     const savedUser = await newUser.save();
//     res.status(200).json(savedUser);
//   } catch (error) {
//     res.status(500).json(err);
//   }
// };

export const updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //while using this it will be updated in response in json
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, result: "User Has been Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, result: "error in deleteUser" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
