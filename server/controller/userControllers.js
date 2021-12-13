import user from "../model/userModel.js";
import cloudinary from "cloudinary";
import { sendToken, sendAdminToken } from "../utlis/sendToken.js";
import { sendMailer } from "../utlis/sendMail.js";
import crypto from "crypto";

export const createUser = async (req, res, next) => {
  try {
    let myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    let { name, email, password, address } = req.body;
    let response = await user.create({
      name: name,
      email: email,
      password: password,
      address: address,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    sendToken(response, res, 200, "user Created");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: `please enter email/password` });
    }
    let response = await user.find({ email: email }).select("+password");
    if (!response[0]) {
      return res.status(401).json({ message: `invalid email/password` });
    }
    let match = await response[0].comparePassword(password);
    if (!match) {
      return res.status(400).json({ message: `invalid email/password` });
    }
    sendToken(response[0], res, 200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res
      .status(200)
      .json({ success: true, message: `user logged out successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    let { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: `please enter an email` });
    }
    let response = await user.findOne({ email: email });
    if (!response) {
      return res.status(404).json({
        message: `email you entered doesnot exists in the server, please enter a valid email or create a new account`,
      });
    }
    let resetPassToken = response.getResetPasswordToken();
    await response.save({ validateBeforeSave: false });
    let resetPassTokenURL = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPassToken}`;
    // let templetResetPassTokenURL = `http://localhost:3000/password/reset/${resetPassToken}`; //this is a temporary url for dev.
    let resetPasswordTokenMessage = `click on the link to reset your password before it expires:\n\n${resetPassTokenURL}`;
    try {
      await sendMailer({
        email: response.email,
        subject: "TRAVEL BUDDY password recovery",
        message: resetPasswordTokenMessage,
      });
      res
        .status(200)
        .json({ success: true, message: `mail sent to ${response.email}` });
    } catch (error) {
      response.resetPasswordToken = undefined;
      response.resetPasswordExpire = undefined;
      await response.save({ validateBeforeSave: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    let resetPasswordToken = crypto
      .createHash("SHA256")
      .update(req.params.token)
      .digest("hex");
    let response = await user.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!response) {
      return res
        .status(404)
        .json({ message: `reset password token is either invalid or expired` });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ message: `password and confirm password does not match` });
    }
    response.password = req.body.password;
    response.resetPasswordToken = undefined;
    response.resetPasswordExpire = undefined;
    await response.save();
    sendToken(response, res, 200, "password reset successfull");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    let response = await user.findById(req.user.id);
    res.status(200).json({ response, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserPassword = async (req, res, next) => {
  try {
    let response = await user.findById(req.user.id).select("+password");
    let match = await response.comparePassword(req.body.oldPassword);
    if (!match) {
      return res.status(400).json({ message: `invalid oldPassword` });
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ message: `old password and new password doesnot match` });
    }
    response.password = req.body.newPassword;
    await response.save();
    sendToken(response, res, 200, "password reset successfull");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    let newData = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    };
    if (req.body.avatar !== "") {
      let response = await user.findById(req.user.id);
      let imageID = response.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageID);
      let myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      newData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    await user.findByIdAndUpdate(req.user.id, newData, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res
      .status(200)
      .json({ success: true, message: `user profile updated successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//**************************ADMIN************************* */

export const getAllUsers = async (req, res, next) => {
  try {
    let response = await user.find();
    res.status(200).json({ success: true, message: "users fetched", response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserDetail = async (req, res, next) => {
  try {
    let response = await user.findById(req.params.id);
    if (!response) {
      return res
        .status(404)
        .json({ message: `user with id: ${req.params.id}\n\n doesnot exist` });
    }
    res.status(200).json({ success: true, response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    let newData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    let response = await user.findByIdAndUpdate(req.params.id, newData, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({ success: true, response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    let response = await user.findById(req.params.id);
    if (!response) {
      return res
        .status(404)
        .json({ message: `user with id: ${req.params.id}, doesnot exist` });
    }
    response.remove();
    res
      .status(200)
      .json({ success: true, message: `user deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
