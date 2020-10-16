import { readFileSync } from "fs";
import { name } from "./model/name";

/**
 * reads sortedNames file, splits into array of name interfaces
 * finds name object that matches query, and returns it
 * @param nameToFind 
 */
export function getNameCount(nameToFind: string) {
  const names = readFileSync("res/sortedNames.txt", "utf-8")
    .split("\n")
    .map(
      (name: string): name => {
        const n = name.split(":");
        return { name: n[0], value: parseInt(n[1]) };
      }
    );

  return names.find((n) => {
    return n.name === nameToFind;
  });
}
