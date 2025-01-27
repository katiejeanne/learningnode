"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hello, world!");
function sum(first, second) {
    if (typeof second == "string") {
        return first + Number.parseInt(second);
    }
    else {
        return first + second;
    }
}
let result = sum(10, 10);
console.log(`Result value: ${result}, Result type: ${typeof result}`);
result = sum(10, "10");
console.log(`Result value: ${result}, Result type: ${typeof result}`);
