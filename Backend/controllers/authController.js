import asyncHandler from "../middleware/asyncHandler.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    rollNumber,
    class: studentClass,
    semester,
    year,
    password,
  } = req.body;
  const existingUser = await User.findOne({
    $or: [{ email }, { rollNumber }],
  });
  if (existingUser) {
    return res.status(400).json({
      message: "Student Already Registered With this Email or Roll number",
    });
  }
  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 12);

  //New user
  const newUser = new User({
    name,
    email,
    rollNumber,
    class: studentClass,
    year,
    semester,
    password: hashedPassword,
  });
  //not returing password in frontend
  await newUser.save();
  const userResponse = {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    rollNumber: newUser.rollNumber,
    class: newUser.class,
    year: newUser.year,
    semester: newUser.semester,
  };
  res.status(201).json({
    message: "Stundent Registered Successfully",
    user: userResponse,
  });
});



export const loginUser = asyncHandler(async (req, res) => {
  const { rollNumber, password } = req.body;

  //finding by rollnumber
  const user = await User.findOne({ rollNumber });
  if (!user) {
    return res.status(400).json({ message: "User Doesn't Exists" });
  }

  //check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid Roll-No or Password" });
  }
  //create jwt token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  //send responses without password
  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    rollNumber: user.rollNumber,
    class: user.class,
    year: user.year,
    semester: user.semester,
  };
  res
    .status(200)
    .json({ message: "Login Successful!", token, user: userResponse });
});
