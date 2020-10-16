"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//file system
var fs = __importStar(require("fs"));
/**
 * Variables used throughout script
 */
var fileName = "sortedNames.txt"; //name of output file
var oliverTwistTxt = "./res/oliver-twist.txt";
var firstNamesTxt = "./res/first-names.txt";
var oliverTwist = fs.readFileSync(oliverTwistTxt, "utf-8");
var nameList = fs.readFileSync(firstNamesTxt, "utf-8");
/**
 * Map of all words, used to count instances with single iteration
 * list of nameInstances objects, so they can be sorted after value
 */
var words = new Map();
var namesMentioned = [];
/**
 * Replaces every character not a letter or number with
 * spaces, including new lines and punctuation.
 * Then splits strings into lists
 */
var nArray = nameList.replace(/([^A-Za-z0-9])/gm, " ").split(" ");
var oArray = oliverTwist.replace(/([^A-Za-z0-9]+)/g, " ").split(" ");
oArray.forEach(function (word) {
    mapWords(word);
});
nArray.forEach(function (name) {
    findName(name);
});
//sorts list based on number of times mentioned
var sortedList = namesMentioned.sort(function (a, b) { return b.value - a.value; });
//format sorted list into string
var data = formatNameList(sortedList);
//writes data string to file named "sortedNames.txt"
fs.writeFileSync(fileName, data);
/**
 * Places every unique word used in text into map,
 * while also counting the amount of times word is used
 * Word is capitalised, to avoid formatting differences between name and word
 * @param word to place in map
 */
function mapWords(word) {
    var capitalised = capitalise(word);
    var val = words.get(capitalised);
    if (val) {
        words.set(capitalised, val + 1);
    }
    else {
        words.set(capitalised, 1);
    }
}
/**
 * Finds instances of name in map,pushes
 * nameInstance interface object to list of names
 * @param name to find in map
 */
function findName(name) {
    var capitalised = capitalise(name);
    var val = words.get(capitalised);
    if (val) {
        namesMentioned.push({ name: capitalised, value: val });
        words.delete(capitalised);
    }
}
/**
 * Capitalises word, to ensure same format, across words and words
 * as well as CAPS LOCK. Trim is necessary to avoid whitespace in some words
 * and names
 * @param word, to be capitalised
 */
function capitalise(word) {
    var lowerCase = word.toLowerCase();
    return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1).trim();
}
/**
 * Iterates over instances of names in text
 * and formats string to be printed in txt file.
 * @param names instances
 */
function formatNameList(names) {
    var str = "";
    names.forEach(function (name) {
        str = str + (name.name + ": " + name.value + " \n");
    });
    return str.trim();
}
