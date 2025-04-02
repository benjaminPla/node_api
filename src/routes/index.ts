import authenticate from "../controllers/authentication/authenticate";
import authenticateToken from "../middlewares/authenticateToken";
import checkAdmin from "../middlewares/checkAdmin";
import checkReq from "../middlewares/checkReq";
import express from "express";
import health from "../controllers/health";
import postGet from "../controllers/post/get";
import userCreate from "../controllers/user/create";
import userGet from "../controllers/user/get";

const router = express.Router();

router.get("/health", health);

router.post(
  "/authenticate",
  checkReq(["body", "body.email", "body.password"]),
  authenticate,
);

router.get("/user", userGet);
router.post(
  "/user/create",
  authenticateToken,
  checkAdmin,
  checkReq(["body", "body.email", "body.password"]),
  userCreate,
);

router.get("/post", postGet);

export default router;
