import express, {Request, Response, NextFunction} from "express";
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";
import product_routes from "./handler/product";
import order_routes from "./handler/order";
import user_routes from "./handler/user";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
const app = express();
const port = 3000;

const {ENV}= process.env;
const rootFolder: string = path.resolve(__dirname) + path.normalize("/views/");
app.use(express.static(rootFolder));
app.use(cookieParser());

//Enable cors for all routes
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req: express.Request, res: express.Response)=>{
  res.sendFile(rootFolder + "login.html");
});

app.get('/users/login', (req: express.Request, res: express.Response)=>{
  res.sendFile(rootFolder + "login.html")
});

app.get('/users/signup', (req: express.Request, res: express.Response)=>{
  res.sendFile(rootFolder + "signup.html")
});



user_routes(app);
product_routes(app);
order_routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
