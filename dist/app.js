"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_2 = __importDefault(require("express"));
var repo_1 = require("./repo");
var App = /** @class */ (function () {
    function App() {
        var router = express_1.default();
        router.get("/name-count/:name", this.getNameCount);
        this.express = express_2.default();
        this.express.use(router);
    }
    App.prototype.getNameCount = function (req, res) {
        res.send(repo_1.getNameCount(req.params.name));
    };
    return App;
}());
exports.default = new App().express;
