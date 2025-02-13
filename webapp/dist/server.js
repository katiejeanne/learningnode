"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const handler_1 = require("./handler");
const https_1 = require("https");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const port = 5001;
const https_port = 5501;
//const server = createServer(handler);
const server = (0, http_1.createServer)(handler_1.redirectionHandler);
// Alternate server.on for filtering out favicon requests
// server.on("request", (req, res) => {
//   if (req.url?.endsWith("favicon.ico")) {
//     res.statusCode = 404;
//     res.end();
//   } else {
//     handler(req, res);
//   }
// });
// Use createrServer(handler) to set the handler directly instead of the following:
// server.on("request", handler);
server.listen(port, () => console.log(`(Event) Server listening on port ${port}`));
// Use server.listen(port, handler) to set the handler directly instead of the following:
// server.on("listening", () => {
//   console.log(`(Event) Server is listening on port ${port}`);
// });
// Creates a simple HTTP server that listens for HTTP requests on port 5000 and processes them using the fundtion defined in handler.ts.
const httpsConfig = {
    key: (0, fs_1.readFileSync)(path_1.default.resolve("key.pem")),
    cert: (0, fs_1.readFileSync)(path_1.default.resolve("cert.pem")),
};
const httpsServer = (0, https_1.createServer)(httpsConfig, handler_1.handler);
httpsServer.listen(https_port, () => console.log(`HTTPS Server listening on port ${https_port}`));
