import { createServer } from "http";
import express, { Express, Request, Response } from "express";
// import { basicHandler } from "./handler";
import { readHandler } from "./readHandler";

const port = 5001;

const expressApp: Express = express();

expressApp.use(express.json());

// expressApp.get("/favicon.ico", (req, resp) => {
//   resp.statusCode = 404;
//   resp.end();
// });
// expressApp.get("*", basicHandler);
expressApp.post("/read", readHandler);

expressApp.get("/sendcity", (req, resp) => {
  resp.sendFile("city.png", { root: "static" });
});

expressApp.get("/downloadcity", (req: Request, resp: Response) => {
  resp.download("static/city.png");
});

expressApp.get("/json", (req: Request, resp: Response) => {
  resp.json("{name: Bob}");
});

expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));

const server = createServer(expressApp);

server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));

// import { createServer } from "http";
// import {
//   redirectionHandler,
//   newUrlHandler,
//   defaultHandler,
//   notFoundHandler,
// } from "./handler";
// import { createServer as createHttpsServer } from "https";
// import { readFileSync } from "fs";
// import path from "path";
// import express, { Express } from "express";

// const port = 5001;
// const https_port = 5501;

// //const server = createServer(handler);
// const server = createServer(redirectionHandler);

// // Set up an express server
// const expressApp: Express = express();
// // Link URL paths to correct handler
// expressApp.get("/favicon.ico", notFoundHandler);
// expressApp.get("/newurl/:message?", newUrlHandler);
// expressApp.get("*", defaultHandler);

// // Alternate server.on for filtering out favicon requests
// // server.on("request", (req, res) => {
// //   if (req.url?.endsWith("favicon.ico")) {
// //     res.statusCode = 404;
// //     res.end();
// //   } else {
// //     handler(req, res);
// //   }
// // });

// // Use createrServer(handler) to set the handler directly instead of the following:
// // server.on("request", handler);

// server.listen(port, () =>
//   console.log(`(Event) Server listening on port ${port}`)
// );

// // Use server.listen(port, handler) to set the handler directly instead of the following:
// // server.on("listening", () => {
// //   console.log(`(Event) Server is listening on port ${port}`);
// // });

// // Creates a simple HTTP server that listens for HTTP requests on port 5000 and processes them using the fundtion defined in handler.ts.

// const httpsConfig = {
//   key: readFileSync(path.resolve("key.pem")),
//   cert: readFileSync(path.resolve("cert.pem")),
// };

// // Initialize server with express
// const httpsServer = createHttpsServer(httpsConfig, expressApp);

// // without express
// // const httpsServer = createHttpsServer(httpsConfig, handler);

// httpsServer.listen(https_port, () =>
//   console.log(`HTTPS Server listening on port ${https_port}`)
// );
