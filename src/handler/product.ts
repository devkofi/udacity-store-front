import express, { Request, Response } from "express";
import { ProductType, Product } from "../models/product";
import { PopularProducts } from "../service/popularProducts";
import { ProductsByCategory } from "../service/productsByCategory";
import { verifyAuthToken } from "../middleware/auth";

const create_product = new Product();
const popular_product = new PopularProducts();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    await create_product.index().then((item) => {
      res.json(item);
    });
  } catch (error) {
    res.status(400);
    res.json(error as unknown as string);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    await create_product.show(req.params.id).then((item) => {
      res.json(item);
    });
  } catch (error) {
    res.status(400);
    res.json(error as unknown as string);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const new_product: ProductType = {
      name: req.body.name as unknown as string,
      price: req.body.price as unknown as number,
      category: req.body.category as unknown as string,
    };

    await create_product.create(new_product).then((item) => {
      res.json(item);
    });
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    await create_product
      .update(req.params.id, {
        name: req.body.name as unknown as string,
        price: req.body.price as unknown as number,
        category: req.body.category as unknown as string,
      })
      .then((item) => {
        res.json(item);
      });
  } catch (error) {
    res.status(400);
    res.json(error as unknown as string);
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    await create_product.delete(req.params.id).then(() => {
      res.send("Successfully Deleted item");
    });
  } catch (error) {
    res.status(400);
    res.json(error as unknown as string);
  }
};

const popularProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    await popular_product.showPopular(req.params.limit).then((item)=>{
      res.json(item)
    });
  } catch (error) {
    res.status(400);
    res.json(error as unknown as string);
  }
  
}

const productsByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await new ProductsByCategory().showCategory(req.params.category).then((item) => {
      res.json(item);
    });
  } catch (error) {
    res.status(400);
    res.json(error as unknown as string);
  }
}


// const verifyAuthToken = (req: Request, res: Response, next: NextFunction) =>{
//     const token = req.cookies.token;

//     try {
//         if(typeof token !== 'undefined'){
//             const verify = async () =>{
//                 await jwt.verify(token, (TOKEN_SECRET as unknown) as string);
//             }
//             next()
//         }
//         else{
//             res.redirect("/login")
//         }

//     } catch (error) {
//         console.log(error)
//         res.clearCookie("token");
//         res.redirect("/login");
//     }

// }

const product_routes = (app: express.Application): void => {
  app.get("/products", index); //index
  app.get("/products/:id", show); //show
  app.get("/products/popular/:limit", popularProduct);
  app.get("/products/category/:category", productsByCategory);
  app.post("/products", verifyAuthToken, create); //create
  app.put("/products/update", verifyAuthToken, update); //update
  app.delete("/products/:id", verifyAuthToken, deleteProduct); //delete
}

export default product_routes;
