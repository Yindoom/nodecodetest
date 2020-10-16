//file system
import * as fs from "fs";

/**
 * interface used to store key (name) and value
 * from map to list (so the ordeal can be sorted)
 */
interface inameInstance {
  name: string;
  value: number;
}

/**
 * Variables used throughout script
 */
const fileName = "sortedNames.txt";     //name of output file
const oliverTwistTxt = "./res/oliver-twist.txt";
const firstNamesTxt = "./res/first-names.txt";

const oliverTwist = fs.readFileSync(oliverTwistTxt, "utf-8");
const nameList = fs.readFileSync(firstNamesTxt, "utf-8");

/**
 * Map of all words, used to count instances with single iteration
 * list of nameInstances objects, so they can be sorted after value
 */
const words: Map<string, number> = new Map();
const namesMentioned: inameInstance[] = [];


/**
 * Replaces every character not a letter or number with
 * spaces, including new lines and punctuation.
 * Then splits strings into lists
 */
const nArray = nameList.replace(/([^A-Za-z0-9])/gm, " ").split(" ");
const oArray = oliverTwist.replace(/([^A-Za-z0-9]+)/g, " ").split(" ");


oArray.forEach((word) => {
  mapWords(word);
});

nArray.forEach((name) => {
  findName(name);
});


//sorts list based on number of times mentioned
const sortedList = namesMentioned.sort((a, b) => b.value - a.value);

//format sorted list into string
const data = formatNameList(sortedList);

//writes data string to file named "sortedNames.txt"
fs.writeFileSync(fileName, data);


/**
 * Places every unique word used in text into map,
 * while also counting the amount of times word is used
 * Word is capitalised, to avoid formatting differences between name and word
 * @param word to place in map
 */
function mapWords(word: string) {
  const capitalised = capitalise(word);
  const val = words.get(capitalised);
  if (val) {
    words.set(capitalised, val + 1);
  } else {
    words.set(capitalised, 1);
  }
}


/**
 * Finds instances of name in map,pushes 
 * nameInstance interface object to list of names
 * @param name to find in map
 */
function findName(name: string) {
    const capitalised: string = capitalise(name);
  const val = words.get(capitalised);
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
function capitalise(word: string): string {
  const lowerCase = word.toLowerCase();
  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1).trim();
}


/**
 * Iterates over instances of names in text
 * and formats string to be printed in txt file.
 * @param names instances 
 */
function formatNameList(names: inameInstance[]): string {
  let str = "";
  names.forEach((name) => {
    str = str + `${name.name}: ${name.value} \n`;
  });
  return str.trim();
}