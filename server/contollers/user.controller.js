import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import User from "../models/user.models.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    // console.log(users);
    if (!users) {
      return next(CreateError(404, "Users Not Found"));
    }
    return next(CreateSuccess(200, "All Users", users));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
};

export const getByUserId = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id);
    if (!users) {
      return next(CreateError(404, "User Not Found"));
    }
    return next(CreateSuccess(200, "single Users", users));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findById(id);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    updatedUser.disable = !updatedUser.disable;

    await updatedUser.save();

    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
