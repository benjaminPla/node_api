import "dotenv/config";
import {
  checkDbConnection,
  getEnvVar,
  rateLimiter,
  speedLimiter,
} from "./helpers";
import express, { Express } from "express";
import router from "./routes";

const app: Express = express();

app.use(express.json());
app.use(rateLimiter);
app.use(speedLimiter);
app.use(router);

const startServer = async () => {
  try {
    await checkDbConnection();

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
