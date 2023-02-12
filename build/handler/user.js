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
var user_1 = require("../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var _a = process.env, ENV = _a.ENV, BCRYPT_PEPPER = _a.BCRYPT_PEPPER, TOKEN_SECRET = _a.TOKEN_SECRET;
var HEADER = new Headers();
var user = new user_1.User(ENV);
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var index_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.index().then(function (item) {
                        console.log(item);
                        res.json(item);
                    })];
            case 1:
                index_1 = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400);
                res.json(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var show_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.show(req.params.id).then(function (item) {
                        console.log(item);
                        res.json(item);
                    })];
            case 1:
                show_1 = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400);
                res.json(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sign;
    return __generator(this, function (_a) {
        try {
            sign = user.signIn({ email: req.body.email, password: req.body.password }).then(function (item) {
                res.json(item);
            });
        }
        catch (error) {
            res.status(400);
            res.json(error);
        }
        return [2 /*return*/];
    });
}); };
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var temp_user, newUser, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                temp_user = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user.signUp(temp_user)];
            case 2:
                newUser = _a.sent();
                token = jsonwebtoken_1["default"].sign({ user: newUser }, process.env.TOKEN_SECRET);
                //console.log(token);
                //TEST
                // req.headers["x-access-token"] = token;
                // console.log(req.headers["x-access-token"]);
                //
                HEADER.set("x-access-token", token);
                res.send("Successfully created user");
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1 + user);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var delUser;
    return __generator(this, function (_a) {
        try {
            delUser = user["delete"](req.params.id).then(function (item) {
                res.json(item);
            });
        }
        catch (error) {
            res.status(400);
            res.json(error);
        }
        return [2 /*return*/];
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.authenticate({ email: req.body.email, password: req.body.password }).then(function (item) {
                        var token = jsonwebtoken_1["default"].sign({ user: item }, process.env.TOKEN_SECRET, { algorithm: 'HS256' });
                        // res.cookie('token', token, {
                        //     httpOnly: true,
                        //     //secure: true,
                        //     maxAge: (5000 * 60),
                        //     //signed: true
                        // });
                        //console.log(token);
                        var header = function () { return res.set('x-access-token', token); };
                        header();
                        console.log(item);
                        if (bcrypt_1["default"].compareSync(req.body.password + BCRYPT_PEPPER, item === null || item === void 0 ? void 0 : item.password)) {
                            res.status(200);
                            res.send("Login Successful");
                        }
                        else {
                            res.send('Could not connect');
                        }
                    })];
            case 1:
                auth = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2 + user);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var verifyCookieAuthToken = function (req, res, next) {
    var token = req.cookies.token;
    try {
        if (typeof token !== 'undefined') {
            var verify = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, jsonwebtoken_1["default"].verify((token), TOKEN_SECRET)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            next();
        }
        else {
            res.redirect("/login");
        }
    }
    catch (error) {
        console.log(error);
        res.clearCookie("token");
        res.redirect("/login");
    }
};
var verifyAuthToken = function (req, res, next) {
    //const token = req.cookies.token;
    // const token = (req.headers["x-access-token"] as unknown) as string;
    var token = HEADER.get("x-access-token");
    console.log(token);
    // try {
    //     if(typeof token !== 'undefined'){
    //         const verify = async () =>{
    //             await jwt.verify((token), (TOKEN_SECRET as unknown) as string);
    //         }
    //         next()
    //     }
    //     else{
    //         res.redirect("/login")
    //     }
    // } catch (error) {
    //     console.log(error)
    //     res.clearCookie("token");
    //     res.redirect("/login");
    // }
    try {
        var decoded = jsonwebtoken_1["default"].verify(String(token), String(process.env.JWT_TOKEN));
        req.headers["authorization"] = decoded;
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
};
var user_routes = function (app) {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users/signup', signUp);
    app["delete"]('/users', verifyAuthToken, deleteUser);
    app.post('/users/login', login);
};
exports["default"] = user_routes;
