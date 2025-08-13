// Backend/controllers/uploadController.js - Updated with title-based naming

import asyncHandler from "../middleware/asyncHandler.js";
import { uploadToR2 } from "../config/r2.js";
import { Paper } from "../models/Paper.js";
import { User } from "../models/User.js";
import { generatePaperFilename } from "../utils/fileUtils.js"; // ✅ Import utility

export const uploadPaperWithFile = asyncHandler(async (req, res) => {
  const {
    title,
    subject,
    class: paperClass,
    semester,
    year,
    examType,
    tags,
  } = req.body;

  if (!req.file) throw new Error("No file uploaded.");
  if (!title || !subject || !paperClass || !semester || !year || !examType)
    throw new Error("Missing required fields.");

  const userId = req.userId;
  const fileName = generatePaperFilename(title);

  const fileUrl = await uploadToR2(
    req.file.buffer,
    fileName, // ✅ Now uses clean title-based name
    req.file.mimeType
  );

  const paper = await Paper.create({
    title,
    subject,
    class: paperClass,
    semester,
    year,
    examType,
    fileName,
    fileUrl,
    uploadedBy: userId,
    tags: tags ? JSON.parse(tags) : [],
  });

  await User.findByIdAndUpdate(userId, { $inc: { uploadCount: 1 } });

  res.status(201).json({
    success: true,
    message: "Upload Successful ! Waiting For Approval",
    data: { paper },
  });
});