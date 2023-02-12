import exprss, { Router } from "express";
import { getSales } from "../controllers/sales.js";
const router = exprss.Router();
router.get("/sales", getSales);
export default router;
