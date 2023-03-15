"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
//import { HEADER } from "../handler/user";
dotenv_1["default"].config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
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
var verifyAuthToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded;
    var _a;
    return __generator(this, function (_b) {
        try {
            token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                throw new Error();
            }
            decoded = jsonwebtoken_1["default"].verify(token, String(TOKEN_SECRET));
            req.token = decoded;
            next();
        }
        catch (err) {
            res.status(401).send("Please authenticate");
        }
        return [2 /*return*/];
    });
}); };
exports.verifyAuthToken = verifyAuthToken;
