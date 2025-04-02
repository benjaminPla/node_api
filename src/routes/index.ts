import authenticate from "../controllers/authentication/authenticate";
import express from "express";
import health from "../controllers/health";
import userCreate from "../controllers/user/create";
import userGet from "../controllers/user/get";
import setToken from "../middlewares/setToken";

const router = express.Router();

router.get("/health", health);
router.get("/user", userGet);
router.post("/authenticate", authenticate);
router.post("/user/create", setToken, userCreate);

export default router;
