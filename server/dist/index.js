"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use("/", (req, res) => {
    res.json("This is express ts app");
});
app.listen(5000, () => {
    console.log("app running in port ", 5000);
});
