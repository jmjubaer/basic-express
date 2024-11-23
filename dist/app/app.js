"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json()); // for parse the json data
app.use(express_1.default.text()); // for parse the text data
// use createRouter method
const userRoutes = express_1.default.Router();
app.use("/api/v1/users", userRoutes);
userRoutes.get('/create-user', (req, res) => {
    const user = req.body;
    res.json({
        success: true,
        message: "user created successfully",
        data: user
    });
});
// as usual routes system
// middleware
const middleware = (req, res, next) => {
    console.log('Middleware called');
    next(); // for go the next 
};
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/:param-1/:subparam', middleware, (req, res) => {
    console.log(req.body); // get body data
    console.log(req.params); // get the params
    console.log(req.query); // get the query ?email=jm@example.com
    // res.send('got data') // send the data as a object
    res.json('got data'); // return the data as a json
});
// not  found error handler
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
// global error handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
exports.default = app;
