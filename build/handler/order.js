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
var order_1 = require("../models/order");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var _a = process.env, ENV = _a.ENV, BCRYPT_PEPPER = _a.BCRYPT_PEPPER, TOKEN_SECRET = _a.TOKEN_SECRET, SALT_ROUNDS = _a.SALT_ROUNDS;
var order = new order_1.Order(ENV);
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order.index().then(function (item) {
                    console.log(item);
                    res.json(item);
                })];
            case 1:
                index = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var show;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order.showCurrentOrder(req.params.id).then(function (item) {
                    res.json(item);
                })];
            case 1:
                show = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var new_order, create_order;
    return __generator(this, function (_a) {
        new_order = {
            product_id: req.body.product_id,
            product_quantity: req.body.product_quantity,
            user_id: req.body.user_id,
            order_status: req.body.order_status
        };
        create_order = order.create(new_order).then(function (item) {
            res.json(item);
        });
        return [2 /*return*/];
    });
}); };
var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteCurrentOrder;
    return __generator(this, function (_a) {
        deleteCurrentOrder = order.deleteCurrentOrder(req.params.id).then(function (item) {
            res.json(item);
        });
        return [2 /*return*/];
    });
}); };
var verifyAuthToken = function (req, res, next) {
    var token = req.cookies.token;
    try {
        if (typeof token !== 'undefined') {
            var verify = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, jsonwebtoken_1["default"].verify(token, TOKEN_SECRET)];
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
var order_routes = function (app) {
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, create);
    app["delete"]('/orders/:id', verifyAuthToken, deleteOrder);
};
exports["default"] = order_routes;
