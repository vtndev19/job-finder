import express from "express";
import {
  getIndustries,
  getAllJobs,
  getJobById,
} from "../controller/jobController.js";
import { getFeaturedJobs } from "../controller/featuredJobController.js";

const router = express.Router();

// ✅ Lấy danh sách ngành
router.get("/industries", getIndustries);

// ✅ Lấy 9 việc làm nổi bật (PHẢI ĐẶT TRƯỚC /jobs/:id)
router.get("/jobs/featured", getFeaturedJobs);

// ✅ Lấy danh sách tất cả công việc
router.get("/jobs", getAllJobs);

// ✅ Lấy chi tiết công việc theo ID
router.get("/jobs/:id", getJobById);

export default router;
