// Backend/routes/paperRoute.js - CRITICAL: Route order matters!

import express from "express"
import {uploadPaper, getAllPapers, getPaperById, downloadPaper, filterPaper, getFilterOptions} from "../controllers/paperController.js"
import {auth} from "../middleware/auth.js"
import upload from "../middleware/upload.js";
import { uploadPaperWithFile } from "../controllers/uploadController.js";
import { validateObjectId } from "../middleware/validateObjectId.js";

const router = express.Router();

// Specific routes MUST come before parameterized routes
router.get("/filters", filterPaper) 
router.get("/filter-options", getFilterOptions)

// Download route BEFORE the generic /:id route
router.post("/:id/download", downloadPaper)  
router.get("/:id", validateObjectId, getPaperById) 
router.get("/", getAllPapers)

// Protected routes
router.post("/upload", auth, upload.single("file"), uploadPaperWithFile);
router.post("/", auth, uploadPaper);

export default router;
