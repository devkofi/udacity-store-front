"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var product_1 = __importDefault(require("./handler/product"));
var order_1 = __importDefault(require("./handler/order"));
var user_1 = require("./handler/user");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var app = (0, express_1.default)();
var port = 3000;
var rootFolder = path_1.default.resolve(__dirname) + path_1.default.normalize("/views/");
app.use(express_1.default.static(rootFolder));
app.use((0, cookie_parser_1.default)());
//Enable cors for all routes
app.use((0, cors_1.default)());
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.sendFile(rootFolder + "login.html");
});
app.get('/users/login', function (req, res) {
    res.sendFile(rootFolder + "login.html");
});
app.get('/users/signup', function (req, res) {
    res.sendFile(rootFolder + "signup.html");
});
(0, user_1.user_routes)(app);
(0, product_1.default)(app);
(0, order_1.default)(app);
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
exports.default = app;
