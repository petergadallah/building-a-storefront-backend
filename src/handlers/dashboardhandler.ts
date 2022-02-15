import express, { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";
import verifyAuthToken from "../verification";

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    res.json(products);
  } catch {
    res.send(`failed to display products in orders`);
  }
};

const fiveMostExpensive = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.fiveMostExpensive();
    res.json(users);
  } catch (err) {
    res.send(`failed to display the most five expensive products. ` + err);
  }
};
const usersWithOrders = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.usersWithOrders();
    res.json(users);
  } catch (err) {
    res.send(`failed to display users with orders. ` + err);
  }
};

const dashboardRoutes = (app: express.Application) => {
  app.get("/join", verifyAuthToken, productsInOrders);
  app.get("/mostexpensive", verifyAuthToken, fiveMostExpensive);
  app.get("/userswithorders", verifyAuthToken, usersWithOrders);
};

export default dashboardRoutes;
