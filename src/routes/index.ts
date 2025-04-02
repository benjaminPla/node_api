import express from "express";
import { health } from "../controllers/health";
import { userCreate } from "../controllers/user/create";

const router = express.Router();

router.get("/health", health);
router.post("/user/create", userCreate);

export default router;
