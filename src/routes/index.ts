import authenticate from "../controllers/authentication/authenticate";
import authenticateToken from "../middlewares/authenticateToken";
import express from "express";
import health from "../controllers/health";
import userCreate from "../controllers/user/create";
import userGet from "../controllers/user/get";

const router = express.Router();

router.get("/health", health);
router.get("/user", userGet);
router.post("/authenticate", authenticate);
router.post("/user/create", authenticateToken, userCreate);

export default router;
