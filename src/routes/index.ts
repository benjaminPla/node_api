import authenticate from "../controllers/authentication/authenticate";
import authenticateToken from "../middlewares/authenticateToken";
import checkAdmin from "../middlewares/checkAdmin";
import checkReq from "../middlewares/checkReq";
import express from "express";
import health from "../controllers/health";
import userCreate from "../controllers/user/create";
import userGet from "../controllers/user/get";

const router = express.Router();

router.get("/health", health);
router.get("/user", userGet);
router.post(
  "/authenticate",
  checkReq(["body", "body.email", "body.password"]),
  authenticate,
);
router.post(
  "/user/create",
  authenticateToken,
  checkAdmin,
  checkReq(["body", "body.email", "body.password"]),
  userCreate,
);

export default router;
