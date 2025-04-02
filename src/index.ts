import "dotenv/config";
import {
  checkDbConnection,
  getEnvVar,
  rateLimiter,
  speedLimiter,
} from "./helpers";
import { syncAndPopulateDb } from "./helpers/syncAndPopulateDb";
import express from "express";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use(speedLimiter);
app.use(router);

const startServer = async () => {
  try {
    await checkDbConnection();
    await syncAndPopulateDb();

    const port = getEnvVar("PORT");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.error(`failed to start server: ${error}`);
    process.exit(1);
  }
};

startServer();
