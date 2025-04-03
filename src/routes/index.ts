import authenticate from "../controllers/authentication/authenticate";
import authenticateToken from "../middlewares/authenticateToken";
import checkAdmin from "../middlewares/checkAdmin";
import checkReq from "../middlewares/checkReq";
import checkValidId from "../middlewares/checkValidId";
import express from "express";
import health from "../controllers/health";
import postGet from "../controllers/post/get";
import postPost from "../controllers/post/post";
import postPut from "../controllers/post/put";
import syncDb from "../controllers/syncDb";
import userCreate from "../controllers/user/create";
import userGet from "../controllers/user/get";

const router = express.Router();

router.get("/health", health);
router.post("/syncDb", authenticateToken, checkAdmin, syncDb);

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
router.post(
  "/post",
  authenticateToken,
  checkReq(["user", "user.id", "body", "body.content"]),
  postPost,
);
router.put(
  "/post/:id",
  authenticateToken,
  checkReq(["params", "params.id", "body", "body.content"]),
  checkValidId,
  postPut,
);

export default router;
