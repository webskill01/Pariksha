// Backend/routes/adminRoute.js - Routes for your existing controller
import express from "express";
import {
  getPendingPapers,
  getAllPapersAdmin,
  approvePaper,
  rejectPaper,
  deletePaper,
  getAdminStats,
} from "../controllers/adminController.js";
import { auth } from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Apply auth middleware chain
router.use(auth);        // Check if user is logged in
router.use(adminAuth);   // Check if user is admin

// Admin routes matching your controller functions
router.get("/stats", getAdminStats);
router.get("/pending-papers", getPendingPapers);
router.get("/papers", getAllPapersAdmin);
router.put("/papers/:id/approve", approvePaper);
router.put("/papers/:id/reject", rejectPaper);
router.delete("/papers/:id", deletePaper);

export default router;
