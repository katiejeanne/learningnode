// const { Buffer } = require("buffer");

// const memoryContainer = Buffer.alloc(4); // 4 bytes or 32 bits

// memoryContainer[0] = 0xf4;
// memoryContainer.writeInt8(-34, 1);
// memoryContainer[2] = 0xb6;
// memoryContainer[3] = 0xff;
// console.log(memoryContainer);

// console.log(memoryContainer[0]);
// console.log(memoryContainer.readInt8(1));
// console.log(memoryContainer[2]);
// console.log(memoryContainer[3]);

// console.log(memoryContainer.toString("hex"));

const buff = Buffer.from("486921", "hex");
console.log(buff.toString("utf8"));
