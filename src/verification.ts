import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const verifyAuthToken = async (req: Request, res: Response, next: Function) => {
  try {
    const authorizationHeader: any = req.headers.authorization;
    const token: any = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
};
export default verifyAuthToken;
