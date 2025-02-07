import { IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs";
// import { readFile } from "fs/promises";
import { endPromise, writePromise } from "./promises";
// import { Worker } from "worker_threads";
import { Count } from "./counter_cb";

const total = 2_000_000_000;
const iterations = 5;
let shared_counter = 0;

export const handler = async (req: IncomingMessage, res: ServerResponse) => {
  const request = shared_counter++;

  Count(request, iterations, total, async (error, update) => {
    if (error !== null) {
      console.log(error);
      res.statusCode = 500;
      await res.end();
    } else if (update !== true) {
      const msg = `Request: ${request}, Iteration: ${update}`;
      console.log(msg);
      await writePromise.bind(res)(msg + "\n");
    } else {
      await endPromise.bind(res)("Done");
    }
  });
};

// export const handler = async (req: IncomingMessage, res: ServerResponse) => {
//   const request = shared_counter++;

//   const worker = new Worker(__dirname + "/count_worker.js", {
//     workerData: {
//       iterations,
//       total,
//       request,
//     },
//   });

//   worker.on("message", async (iter: number) => {
//     const msg = `Request: ${request}, Iteration: ${iter}`;
//     console.log(msg);
//     await writePromise.bind(res)(msg + "\n");
//   });

//   worker.on("exit", async (code: number) => {
//     if (code == 0) {
//       await endPromise.bind(res)("Done");
//     } else {
//       res.statusCode = 500;
//       await res.end();
//     }
//   });

//   worker.on("error", async (err) => {
//     console.log(err);
//     res.statusCode = 500;
//     await res.end();
//   });
// };

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
