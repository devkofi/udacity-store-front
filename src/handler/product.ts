import express, {Request, Response, NextFunction} from 'express';
import {ProductType, Product} from '../models/product';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PopularProducts } from '../service/popularProducts';
import { ProductsByCategory } from '../service/productsByCategory';
const {ENV, TOKEN_SECRET} = process.env;

const create_product = new Product((ENV as unknown) as string);

const index = async (_req: Request, res: Response): Promise<void> =>{
    const product = create_product.index().then((item)=>{
        res.json(item);
    });
}

const show = async (req: Request, res: Response): Promise<void> =>{
    const product = create_product.show((req.params.id as unknown) as string).then((item)=>{
        res.json(item);
    });
}

const create = async (req: Request, res: Response): Promise<void> =>{
    const new_product: ProductType = {
      name: (req.body.name as unknown) as string, 
      price: (req.body.price as unknown) as number,
      category:(req.body.category as unknown) as string
  };

  const product = create_product.create(new_product).then((item)=>{
      res.json(item);
  });
  
}

const update = async (req: Request, res: Response): Promise<void> =>{
    const product = create_product.update(req.params.id, {"name": ((req.body.name as unknown) as string), "price": (req.body.price as unknown) as number, "category": (req.body.category as unknown) as string}).then((item)=>{
        res.json(item);
    });
}

const deleteProduct = async (req: Request, res: Response): Promise<void> =>{
    const product = create_product.delete(req.params.id).then((item)=>{
        res.send('Successfully Deleted item');
    });
}

const popularProduct = async (req: Request, res: Response): Promise<void> =>{
    const popularProduct = new PopularProducts((ENV as unknown) as string).show().then((item)=>{
        res.json(item);
    });
}

const productsByCategory = async (req: Request, res: Response): Promise<void> =>{
    const productsByCategory = new ProductsByCategory((ENV as unknown) as string).show(req.params.category).then((item)=>{
        res.json(item);
    });
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


const product_routes = (app: express.Application): void =>{
    app.get('/products', index); //index
    app.get('/products/popular', popularProduct);
    app.get('/products/:category', productsByCategory)
    app.post('/products', verifyAuthToken, create); //create
    app.get('/products/:id', show); //show
    app.put('/products/update', verifyAuthToken, update); //update
    app.delete('/products/:id', verifyAuthToken, deleteProduct); //delete
}

export default product_routes;

