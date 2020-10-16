"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameCount = void 0;
var fs_1 = require("fs");
function getNameCount(nameToFind) {
    var names = fs_1.readFileSync("res/sortedNames.txt", "utf-8")
        .split("\n")
        .map(function (name) {
        var n = name.split(":");
        return { name: n[0], value: parseInt(n[1]) };
    });
    return names.find(function (n) {
        return n.name === nameToFind;
    });
}
exports.getNameCount = getNameCount;
