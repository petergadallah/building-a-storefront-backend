import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/products";
import verifyAuthToken from "../verification";

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.send(products);
  } catch (err) {
    res.send("failed to display index of all products. " + err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const products = await store.show(req.params.id);
    res.json(products);
  } catch (err) {
    res.send(` failed to show product ${req.params.id}. ` + err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.send(`failed to create a new product. ` + err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await store.update(product, req.params.id);
    res.json(newProduct);
  } catch (err) {
    res.send(`failed to update product ${req.params.id}. ` + err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
    res.send();
  } catch (err) {
    res.send(`failed to delete product ${req.params.id}. ` + err);
  }
};

const productRoute = (app: express.Application) => {
  app.get("/indexproduct", index);
  app.get("/showproduct/:id", show);
  app.post("/createproduct", verifyAuthToken, create);
  app.delete("/deleteproduct/:id", verifyAuthToken, destroy);
  app.post("/updateproduct/:id", verifyAuthToken, update);
};

export default productRoute;
