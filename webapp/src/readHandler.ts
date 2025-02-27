import { IncomingMessage, ServerResponse } from "http";
// import { Transform } from "stream";
import { Request, Response } from "express";

export const readHandler = async (req: Request, resp: Response) => {
  if (req.headers["content-type"] === "application/json") {
    const payload = req.body;
    if (payload instanceof Array) {
      resp.json({ arraySize: payload.length });
    } else {
      resp.write("Did not receive an array");
    }
    resp.end();
    // req.pipe(createFromJsonTransform()).on("data", (payload) => {
    //   if (payload instanceof Array) {
    //     resp.write(`Received an array with ${payload.length} items`);
    //   } else {
    //     resp.write("Did not receive an array");
    //   }
    //   resp.end();
    // });
  } else {
    req.pipe(resp);
  }
  //   req.pipe(resp);
  //   req.setEncoding("utf-8");
  //   for await (const data of req) {
  //     console.log(data);
  //   }
  //   //   req.on("data", (data: string) => {
  //   //     console.log(data);
  //   //   });
  //   console.log("End: all data read");
  //   resp.end();
  //   req.on("end", () => {
  //     console.log("End: all data read");
  //     resp.end();
  //   });
};

// const createFromJsonTransform = () =>
//   new Transform({
//     readableObjectMode: true,
//     transform(data, encoding, callback) {
//       callback(null, JSON.parse(data));
//     },
//   });
