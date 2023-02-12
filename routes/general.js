import exprss, { Router } from "express";
import { getUser, getDashboardStats } from "../controllers/general.js";
const router = exprss.Router();
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);
export default router;
