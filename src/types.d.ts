// declare namespace Express {
//     export interface Request {
//         user: any;
//     }
//     export interface Response {
//         user: any;
//     }
// }

declare namespace Express {
    import { User } from "./models/user";
    export interface Request {
      user?: User;
     //   user?: User;
     // Alse tried as 
     // user: string
    // user?: string
    // user: any ...
    }
  }