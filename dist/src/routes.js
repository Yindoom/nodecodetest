"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
function routes(app) {
    app.get("/name-count/:name", function (req, res) {
        res.send("Hello");
    });
}
exports.routes = routes;
