"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// import { readFile } from "fs";
// import { readFile } from "fs/promises";
const promises_1 = require("./promises");
const worker_threads_1 = require("worker_threads");
const total = 2000000000;
const iterations = 5;
let shared_counter = 0;
const handler = async (req, res) => {
    const request = shared_counter++;
    const worker = new worker_threads_1.Worker(__dirname + "/count_worker.js", {
        workerData: {
            iterations,
            total,
            request,
        },
    });
    worker.on("message", async (iter) => {
        const msg = `Request: ${request}, Iteration: ${iter}`;
        console.log(msg);
        await promises_1.writePromise.bind(res)(msg + "\n");
    });
    worker.on("exit", async (code) => {
        if (code == 0) {
            await promises_1.endPromise.bind(res)("Done");
        }
        else {
            res.statusCode = 500;
            await res.end();
        }
    });
    worker.on("error", async (err) => {
        console.log(err);
        res.statusCode = 500;
        await res.end();
    });
};
exports.handler = handler;
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//   const request = shared_counter++;
//   const iterate = async (iter: number = 0) => {
//     for (let count = 0; count < total; count++) {
//       count++;
//     }
//     const msg = `Request: ${request}, Iteration: ${iter}`;
//     console.log(msg);
//     await writePromise.bind(res)(msg + "\n");
//     if (iter == iterations - 1) {
//       await endPromise.bind(res)("Done");
//     } else {
//       setImmediate(() => iterate(++iter));
//     }
//   };
//   iterate();
// };
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//   const request = shared_counter++;
//   for (let iter = 0; iter < iterations; iter++) {
//     for (let count = 0; count < total; count++) {
//       count++;
//     }
//     const msg = `Request: ${request}, Iteration: ${iter}`;
//     console.log(msg);
//     await writePromise.bind(res)(msg + "\n");
//   }
//   await endPromise.bind(res)("Done");
// };
// // Using async/await
// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//   try {
//     const data: Buffer = await readFile("data.json");
//     // res.end(data, () => console.log("File sent"));
//     await endPromise.bind(res)(data);
//     console.log("File sent");
//   } catch (error: any) {
//     console.log(`Error: ${error?.message ?? error}`);
//     res.statusCode = 500;
//     res.end();
//   }
// };
// Using promises
// export const handler = (req: IncomingMessage, res: ServerResponse) => {
//   const p: Promise<Buffer> = readFile("data.json");
//   p.then((data: Buffer) => res.end(data, () => console.log("File sent")));
//   p.catch((err: Error) => {
//     console.log(`Error: ${err.message}`);
//     res.statusCode = 500;
//     res.end();
//   });
// };
// Using callbacks
// export const handler = (req: IncomingMessage, res: ServerResponse) => {
//   readFile("data.json", (err: Error | null, data: Buffer) => {
//     if (err == null) {
//       res.end(data, () => console.log("File sent"));
//     } else {
//       console.log(`Error: ${err.message}`);
//       res.statusCode = 500;
//       res.end();
//     }
//   });
// };
