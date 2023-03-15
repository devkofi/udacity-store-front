import express, { Request, Response } from "express";
import { OrderProducts, OrderProductsType } from "../models/orderProducts";
import { verifyAuthToken } from "../middleware/auth";

const order = new OrderProducts();
//const completedOrder = new CompletedOrder();

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    await order.index().then((item) => {
      console.log(item);
      res.json(item);
    });
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    await order.show(req.params.id).then((item) => {
      res.json(item);
    });
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const new_order: OrderProductsType = {
      order_id: req.body.order_id as unknown as number,
      product_id: req.body.product_id as unknown as number,
      quantity: req.body.quantity as unknown as number,
    };

    order.create(new_order).then((item) => {
      res.json(item);
    });
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    order.delete(req.params.id).then((item) => {
      res.json(item);
    });
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const order_products_routes = (app: express.Application): void => {
  app.get("/orderproducts", verifyAuthToken, index);
  app.get("/orderproducts/:id", verifyAuthToken, show);
  app.post("/orderproducts/", verifyAuthToken, create);
  app.delete("/orderproducts/:id", verifyAuthToken, deleteOrder);
};

export default order_products_routes;
