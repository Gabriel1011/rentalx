import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import "../typeorm";
import "../../container";
import { AppError } from "@errors/appError";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
