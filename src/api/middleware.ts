import express from "express";

export const loggerMiddleware = (
  request: express.Request,
  _response: express.Response,
  next: express.NextFunction
) => {
  console.log(`[${request.method}] ${request.url}`);
  next();
};
