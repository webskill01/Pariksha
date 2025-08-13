// Backend/controllers/adminController.js - Fixed version
import asyncHandler from "../middleware/asyncHandler.js";
import { User } from "../models/User.js";
import { Paper } from "../models/Paper.js";
import { deleteFromR2 } from "../config/r2.js";

export const getPendingPapers = asyncHandler(async (req, res) => {
  const pendingPapers = await Paper.find({ status: "pending" })
    .populate("uploadedBy", "name email rollNumber class semester")
    .sort({ createdAt: -1 }); // last created first

  res.json({
    success: true,
    count: pendingPapers.length,
    data: { papers: pendingPapers },
  });
});

export const getAllPapersAdmin = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filters = {};
  
  if (status) { filters.status = status } 

  const papers = await Paper.find(filters)
    .populate("uploadedBy", "name email rollNumber class semester")
    .sort({ createdAt: -1 }); // last created first

  res.json({ 
    success: true, 
    count: papers.length, 
    data: { papers } 
  });
});

export const approvePaper = asyncHandler(async (req, res) => {
  const paper = await Paper.findById(req.params.id);

  if (!paper) {
    return res.status(404).json({
      success: false,
      message: "Paper Not Found",
    });
  } 
  if (paper.status !== "pending") {
    return res.status(400).json({
      success: false,
      message: `Paper is actually ${paper.status}`,
    });
  } 

  paper.status = "approved";
  paper.rejectionReason = null;
  await paper.save();

  res.json({
    success: true,
    message: "Paper Approved Successfully",
    data: paper,
  });
});

export const rejectPaper = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  const paper = await Paper.findById(req.params.id);

  if (!paper) {
    return res.status(404).json({
      success: false,
      message: "Paper Not Found",
    });
  }

  if (paper.status !== "pending") {
    return res.status(400).json({
      success: false,
      message: `Paper is actually ${paper.status}`,
    });
  } 

  paper.status = "rejected";
  paper.rejectionReason = reason || "No Reason Provided";
  await paper.save();

  res.json({ 
    success: true, 
    message: "Paper Rejected", 
    data: paper 
  });
});

// Better error handling for R2 deletion

export const deletePaper = asyncHandler(async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper Not Found",
      });
    }

    // Step 1: Attempt to delete file from Cloudflare R2
    let r2DeleteResult = { success: false, message: "No file to delete" };
    
    if (paper.fileUrl) {
      r2DeleteResult = await deleteFromR2(paper.fileUrl);
    }

    // Step 2: Always delete paper from MongoDB (even if R2 fails)
    await Paper.findByIdAndDelete(req.params.id);

    // Step 3: Return comprehensive response
    res.json({ 
      success: true, 
      message: "Paper deletion completed",
      details: {
        databaseDeleted: true,
        r2Deleted: r2DeleteResult.success,
        r2Message: r2DeleteResult.message,
        r2Error: r2DeleteResult.error || null,
        fileName: r2DeleteResult.fileName || null
      }
    });

  } catch (error) {
    console.error("Delete paper error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete paper",
      error: error.message
    });
  }
});
export const getAdminStats = asyncHandler(async (req, res) => {
  const totalPapers = await Paper.countDocuments();
  const pendingPapers = await Paper.countDocuments({ status: "pending" });
  const approvedPapers = await Paper.countDocuments({ status: "approved" }); // ✅ Fixed typo
  const rejectedPapers = await Paper.countDocuments({ status: "rejected" });
  const totalUsers = await User.countDocuments();

  // recentPapers query
  const recentPapers = await Paper.find()
    .populate("uploadedBy", "name rollNumber")
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    success: true,
    data: {
      stats: { // ✅ Renamed from 'status' to avoid confusion
        totalPapers,
        pendingPapers,
        approvedPapers,
        rejectedPapers,
        totalUsers,
      },
      recentActivity: recentPapers,
    },
  });
});
