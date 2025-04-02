import "dotenv/config";
import express from "express";
import { getEnvVar } from "./helpers";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(router);

const port = getEnvVar("PORT");
app.listen(port, () => `api running on port ${port}`);
