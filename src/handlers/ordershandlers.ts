import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/orders";
import verifyAuthToken from "../verification";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.send(orders);
  } catch (err) {
    res.send(`failed to display index of all orders. ` + err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const orders = await store.show(req.params.id);
    res.json(orders);
  } catch (err) {
    res.send(`failed to show product ${req.params.id}. ` + err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.send(`failed to create a new order. ` + err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const neworder = await store.update(order, req.params.id);
    res.json(neworder);
  } catch (err) {
    res.send(`failed to update order ${req.params.id}. ` + err);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
  res.send();
};

const OrdersRoute = (app: express.Application) => {
  app.get("/indexorder", index);
  app.get("/showorder/:id", show);
  app.post("/createorder", verifyAuthToken, create);
  app.delete("/deleteorder/:id", verifyAuthToken, destroy);
  app.post("/orders/:id/products", verifyAuthToken, addProduct);
  app.post("/updateorder/:id", verifyAuthToken, update);
};

export default OrdersRoute;
