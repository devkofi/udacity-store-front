import express, {NextFunction, Request, Response} from 'express';
import {Order, OrderType} from '../models/order';
import { CompletedOrder } from '../service/completedOrders';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config()
const {TOKEN_SECRET} = process.env;

const order = new Order();
const completedOrder = new CompletedOrder()

const index = async (req: Request, res: Response): Promise<void> =>{
    try {
        await order.index().then((item)=>{
            console.log(item);
            res.json(item)
        });
        
    } catch (error) {
        res.status(400);
        res.json((error))
    }
    
}

const show = async (req: Request, res: Response): Promise<void> =>{
    try {
        await order.show(req.params.id).then((item)=>{
        res.json(item);
    })
    } catch (error) {
        res.status(400);
        res.json(error);
    }
    
}

const create = async (req: Request, res: Response): Promise<void> =>{
    try {
        const new_order: OrderType = {
            product_id: (req.body.product_id as unknown) as number, 
            product_quantity: (req.body.product_quantity as unknown) as number,
            user_id:(req.body.user_id as unknown) as number,
            order_status: (req.body.order_status as unknown) as string
      };
    
      order.create(new_order).then((item)=>{
          res.json(item);
      });
    } catch (error) {
        res.status(400)
        res.json(error)
        
    }
    
  
}

const deleteOrder = async (req: Request, res:Response): Promise<void> =>{

    try {
        order.delete(req.params.id).then((item)=>{
            res.json(item);
        })
    } catch (error) {
        res.status(400)
        res.json(error)
        
    }

    
}

const completedOrders = async (req: Request, res: Response): Promise<void> =>{

    try {
        await completedOrder.completed(req.params.user_id, req.params.order_status).then((item)=>{
            res.json(item);
        })
    } catch (error) {
        res.status(400)
        res.json(error)
        
    }
    
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.cookies.token;
    
    try {
        if(typeof token !== 'undefined'){
            async () =>{
                await jwt.verify(token, (TOKEN_SECRET as unknown) as string);
            }
            next()
        }
        else{
            res.redirect("/login")
        }
        
    } catch (error) {
        console.log(error)
        res.clearCookie("token");
        res.redirect("/login");
    }

}

const order_routes = (app: express.Application): void =>{
    app.get('/orders',verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.get('/orders/:user_id/:order_status', completedOrders);
    app.post('/orders',verifyAuthToken, create)
    app.delete('/orders/:id',verifyAuthToken, deleteOrder);

}

export default order_routes;

