// Backend/controllers/paperController.js - Fixed implementation

import { Paper } from "../models/Paper.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { User } from "../models/User.js";

export const uploadPaper = asyncHandler(async (req, res) => {
  const {
    title,
    subject,
    class: paperClass,
    semester,
    year,
    examType,
    fileName,
    fileUrl,
    tags,
  } = req.body;

  if (!title || !subject || !paperClass || !semester || !year || !examType) {
    return res
      .status(400)
      .json({ message: "Please Provide All The Required Fields" });
  }

  const paper = new Paper({
    title,
    subject,
    class: paperClass,
    semester,
    year,
    examType,
    fileName,
    fileUrl,
    uploadedBy: req.userId,
    tags: tags || [],
    status: "pending",
  });

  const savedPaper = await paper.save();
  await User.findByIdAndUpdate(req.userId, { $inc: { uploadCount: 1 } });

  res.status(201).json({
    message: "Paper Uploaded Successfully! Waiting for Admin Approval",
    data: { paper: savedPaper },
  });
});

// This should handle basic paper listing without filters
export const getAllPapers = asyncHandler(async (req, res) => {
  const papers = await Paper.find({ status: "approved" })
    .populate("uploadedBy", "name rollNumber")
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({ 
    success: true, 
    count: papers.length, 
    data: { papers } 
  });
});

export const getPaperById = asyncHandler(async (req, res) => {
  const paper = await Paper.findById(req.params.id).populate(
    "uploadedBy",
    "name rollNumber class semester"
  );

  if (!paper) {
    return res.status(404).json({
      success: false,
      message: "Paper Not Found",
    });
  }

  if (paper.status !== "approved") {
    return res.status(404).json({
      success: false,
      message: "Paper Not Found",
    });
  }

  res.json({
    success: true,
    data: paper,
  });
});

export const downloadPaper = asyncHandler(async (req, res) => {
  const paper = await Paper.findById(req.params.id);

  if (!paper) {
    return res.status(404).json({
      success: false,
      message: "Paper not found"
    });
  }

  
  const user = req.user; 
  const isAdmin = user && user.role === 'admin'; // Adjust based on your admin check

  if (paper.status !== "approved" && !isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Paper not available for download"
    });
  }

  if (!paper.fileUrl) {
    return res.status(404).json({
      success: false,
      message: "File URL not found"
    });
  }

  // Increment download count atomically with download
  const updatedPaper = await Paper.findByIdAndUpdate(
    req.params.id,
    { $inc: { downloadCount: 1 } },
    { new: true } // Return updated document
  );

  res.json({
    success: true,
    message: "Download URL generated",
    data: {
      fileUrl: paper.fileUrl,
      fileName: `${paper.title}.pdf`,
      downloadCount: updatedPaper.downloadCount, // ✅ Return updated count
    }
  });
});


// Main filtering and sorting logic
export const filterPaper = asyncHandler(async (req, res) => {
  try {
    const { search, subject, class: className, semester, examType, year, sortBy } = req.query;

    // Build MongoDB query
    let query = { status: 'approved' };

    // Add search functionality
    if (search && search.trim()) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Add individual filters
    if (subject && subject.trim()) {
      query.subject = { $regex: subject, $options: 'i' };
    }
    if (className && className.trim()) {
      query.class = { $regex: className, $options: 'i' };
    }
    if (semester && semester.trim()) {
      query.semester = semester;
    }
    if (examType && examType.trim()) {
      query.examType = examType;
    }
    if (year && year.trim()) {
      query.year = year;
    }

    // Proper sorting logic
    let sortQuery = { createdAt: -1 }; // Default: newest first

    switch (sortBy) {
      case 'newest':
        sortQuery = { createdAt: -1 };
        break;
      case 'popular':
        sortQuery = { downloadCount: -1, createdAt: -1 };
        break;
      case 'title':
        sortQuery = { title: 1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

    const papers = await Paper.find(query)
      .populate('uploadedBy', 'name rollNumber')
      .sort(sortQuery)
      .limit(100);

    res.json({
      success: true,
      data: {
        papers: papers,
        total: papers.length
      }
    });

  } catch (error) {
    console.error('Filter error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch papers',
      error: error.message
    });
  }
});

// filter options endpoint
export const getFilterOptions = asyncHandler(async (req, res) => {
  try {
    // Get unique values for filters from approved papers
    const [subjects, classes, semesters, examTypes, years] = await Promise.all([
      Paper.distinct('subject', { status: 'approved' }),
      Paper.distinct('class', { status: 'approved' }),
      Paper.distinct('semester', { status: 'approved' }),
      Paper.distinct('examType', { status: 'approved' }),
      Paper.distinct('year', { status: 'approved' })
    ]);

    res.json({
      success: true,
      data: {
        subjects: subjects.filter(Boolean).sort(),
        classes: classes.filter(Boolean).sort(),
        semesters: semesters.filter(Boolean).sort(),
        examTypes: examTypes.filter(Boolean).sort(),
        years: years.filter(Boolean).sort().reverse() // Latest years first
      }
    });
  } catch (error) {
    console.error('Filter options error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch filter options'
    });
  }
});
