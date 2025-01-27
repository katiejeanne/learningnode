"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hello, world!");
// function sum(first: number, second: number | string) {
//   if (typeof second == "string") {
//     return first + Number.parseInt(second);
//   } else {
//     return first + second;
//   }
// }
// let result = sum(10, 10);
// console.log(`Result value: ${result}, Result type: ${typeof result}`);
// result = sum(10, "10");
// console.log(`Result value: ${result}, Result type: ${typeof result}`);
// let condition: boolean = true;
// let person: string = "Bob";
// const age: number = 40;
// let place;
// console.log("Place value: " + place + " Type: " + typeof place);
// place = "London";
// console.log("Place value: " + place + " Type: " + typeof place);
// place = null;
// console.log("Place value: " + place + " Type: " + typeof place);
let firstBool = true;
let secondBool = false;
let val1;
let val2 = "London";
let val3 = 0;
let coalesced1 = val1 || "fallback value";
let coalesced2 = val2 || "fallback value";
let coalesced3 = val3 || 10;
console.log(`Coalesced1: ${coalesced1}, Type: ${typeof coalesced1}`);
console.log(`Coalesced2: ${coalesced2}, Type: ${typeof coalesced2}`);
console.log(`Coalesced3: ${coalesced3}, Type: ${typeof coalesced3}`);
