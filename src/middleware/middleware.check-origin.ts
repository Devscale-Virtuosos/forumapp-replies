import { NextFunction, Request, Response } from "express";

export async function middlewareCheckOrigin(req: Request, res: Response, next: NextFunction) {
  console.log("origin request:", req.headers.host);
  if (req.headers.host === "localhost:8010") {
    return next();
  }
  return res.status(403).send("You are not allowed to access this service");
}
