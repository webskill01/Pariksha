import express from "express"
import { getMyDashboard , deleteMyPaper } from "../controllers/userController.js"
import { auth } from "../middleware/auth.js"

const router = express.Router();

router.get("/me/dashboard",auth,getMyDashboard)
router.delete("/me/paper:id",auth,deleteMyPaper)

export default router;