"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var http_1 = require("http");
var app_1 = __importDefault(require("./app"));
var server = http_1.createServer(app_1.default);
dotenv_1.config({ path: path_1.resolve(__dirname, "../.env") });
var PORT = process.env.PORT || 3333;
server.listen(PORT, function () { return console.log("running on port " + PORT); });
