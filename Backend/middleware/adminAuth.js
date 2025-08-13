// Backend/middleware/adminAuth.js - Fixed version
import asyncHandler from "./asyncHandler.js";
import { User } from "../models/User.js";

const adminAuth = asyncHandler(async (req, res, next) => {
  const adminEmails = [
    "nitinemailss@gmail.com"
    // Add more admin emails here as needed
  ];

  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Admin Not Found"
    });
  }

  if (!adminEmails.includes(user.email)) {
    return res.status(403).json({
      success: false,
      message: "Access Denied, Admin Privileges Required"
    });
  }

  // Add user to request for use in controllers
  req.user = user;
  next();
});

export default adminAuth;
