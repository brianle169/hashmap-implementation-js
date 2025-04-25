// Test HashMap implementation
import HashMap from "./modules/HashMap";

const loadFactor = 0.75;
const test = new HashMap(loadFactor);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.toString());
console.log(test.has("apple"));

test.set("apple", "green");
console.log(test.toString());

console.log(test.entries());

// Expand
test.set("monkey", "brown");
console.log(test.toString());
