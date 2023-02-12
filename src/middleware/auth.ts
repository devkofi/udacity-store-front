import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
//import { HEADER } from "../handler/user";

dotenv.config()
const {
    TOKEN_SECRET
} = process.env

export interface CustomRequest extends Request {
    token: string | jwt.JwtPayload;
   }

// const verifyCookieAuthToken = (req: Request, res: Response, next: NextFunction) =>{
//     const token = req.cookies.token;
    
//     try {
//         if(typeof token !== 'undefined'){
//             const verify = async () =>{
//                 await jwt.verify((token), (TOKEN_SECRET as unknown) as string);
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

// // const verifyAuthTokenHeader = (req: Request, res: Response, next: NextFunction) =>{
// //     const token = (HEADER.get("x-access-token") as unknown) as string
// //     console.log("Token: " + token);
// //     try {
// //         const decoded = jwt.verify(String(token), String(process.env.JWT_TOKEN));
        
// //         //HEADER.get() = (decoded as unknown) as string;
// //       } catch (err) {
// //         return res.status(401).send("Invalid Token");
// //       }

// //       next()
// // }

// const verifyAuthToken = (req: Request, res: Response, next: NextFunction) =>{
//     res.set("x-access-token","")
//     const token = res.get("x-access-token")
//     //console.log("Token: " + token);
//     try {
//         const decoded = jwt.verify(String(token), String(TOKEN_SECRET));
        
//       } catch (err) {
//         return res.status(401).send("Invalid Token");
//       }

//       next();
// }

const verifyAuthToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //const token = req.header('Authorization')?.replace('Bearer ', '');
      const token = req.headers.authorization?.split(' ')[1];
   
      if (!token) {
        throw new Error();
      }
   
      const decoded = jwt.verify(token, String(TOKEN_SECRET));
      (req as CustomRequest).token = decoded;
   
      next();
    } catch (err) {
      res.status(401).send('Please authenticate');
    }
};
export {verifyAuthToken};