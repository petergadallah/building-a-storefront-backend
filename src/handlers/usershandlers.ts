import express, { Request, Response } from "express";
import { users, User } from "../models/users";
import jwt from "jsonwebtoken";
import verifyAuthToken from "../verification";

const store = new users();

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);

    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json((err as string) + user);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const u = await store.authenticate(user.username, user.password);
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    if (u.password_digest.length > 0) {
      res.json(token);
    }
  } catch (error) {
    res.status(401);
    res.send("null");
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.send(users);
  } catch (err) {
    res.send("failed to display index of all users. " + err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.send(` failed to show user ${req.params.id}. ` + err);
  }
};

const userRoute = (app: express.Application) => {
  app.post("/createuser", create);
  app.post("/authuser", authenticate);
  app.get("/showuser/:id",verifyAuthToken, show);
  app.get("/indexuser",verifyAuthToken, index);
};

export default userRoute;
