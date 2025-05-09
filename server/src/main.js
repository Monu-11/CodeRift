import express from "express";
import dotenv from "dotenv";
import { db } from "./libs/db.js";
import authRouter from "./routes/auth.route.js";
import problemRouter from "./routes/problem.route.js";
import executionRouter from "./routes/executeCode.routes.js";
import submissionRouter from "./routes/submission.routes.js";
import playlistRouter from "./routes/playlist.routes.js";

dotenv.config({ path: "./.env" });

async function main() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.send("Healthy");
  });

  //routing;
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/problems", problemRouter);
  app.use("/api/v1/execute-code", executionRouter);
  app.use("/api/v1/submission", submissionRouter);
  app.use("/api/v1/playlist", playlistRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

main().catch((e) => {
  console.error("Error during server startup:", e);
  process.exit(1);
});

// Handle graceful shutdown (optional but good practice)
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await db.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await db.$disconnect();
  process.exit(0);
});
