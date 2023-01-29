import express, {NextFunction, Request, Response} from 'express';
import {Order, OrderType} from '../models/order';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';


const {ENV,BCRYPT_PEPPER, TOKEN_SECRET, SALT_ROUNDS} = process.env;

const order = new Order((ENV as unknown) as string);

const index = async (req: Request, res: Response): Promise<void> =>{
    const index = await order.index().then((item)=>{
        console.log(item);
        res.json(item)
    })
}

const show = async (req: Request, res: Response): Promise<void> =>{
    const show = await order.showCurrentOrder(req.params.id).then((item)=>{
        res.json(item);
    })
}

const create = async (req: Request, res: Response): Promise<void> =>{
    const new_order: OrderType = {
        product_id: (req.body.product_id as unknown) as number, 
        product_quantity: (req.body.product_quantity as unknown) as number,
        user_id:(req.body.user_id as unknown) as number,
        order_status: (req.body.order_status as unknown) as string
  };

  const create_order = order.create(new_order).then((item)=>{
      res.json(item);
  });
  
}


const deleteOrder = async (req: Request, res:Response): Promise<void> =>{
    const deleteCurrentOrder = order.deleteCurrentOrder(req.params.id).then((item)=>{
        res.json(item);
    })
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.cookies.token;
    
    try {
        if(typeof token !== 'undefined'){
            const verify = async () =>{
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
    app.post('/orders',verifyAuthToken, create)
    app.delete('/orders/:id',verifyAuthToken, deleteOrder);

}

export default order_routes;

