import authenticate from "../controllers/authentication/authenticate";
import authenticateToken from "../middlewares/authenticateToken";
import checkAdmin from "../middlewares/checkAdmin";
import checkReq from "../middlewares/checkReq";
import checkValidId from "../middlewares/checkValidId";
import express from "express";
import health from "../controllers/health";
import postDelete from "../controllers/post/delete";
import postGet from "../controllers/post/get";
import postPost from "../controllers/post/post";
import postPut from "../controllers/post/put";
import syncDb from "../controllers/syncDb";
import userGet from "../controllers/user/get";
import userPost from "../controllers/user/post";

const router = express.Router();

router.get("/health", health);
router.post("/syncDb", syncDb);

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
  userPost,
);

router.delete(
  "/post/:id",
  authenticateToken,
  checkReq(["params", "params.id"]),
  checkValidId,
  postDelete,
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
