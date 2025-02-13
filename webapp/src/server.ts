import { createServer } from "http";
import { handler, redirectionHandler } from "./handler";
import { createServer as createHttpsServer } from "https";
import { readFileSync } from "fs";
import path from "path";

const port = 5001;
const https_port = 5501;

//const server = createServer(handler);
const server = createServer(redirectionHandler);

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

server.listen(port, () =>
  console.log(`(Event) Server listening on port ${port}`)
);

// Use server.listen(port, handler) to set the handler directly instead of the following:
// server.on("listening", () => {
//   console.log(`(Event) Server is listening on port ${port}`);
// });

// Creates a simple HTTP server that listens for HTTP requests on port 5000 and processes them using the fundtion defined in handler.ts.

const httpsConfig = {
  key: readFileSync(path.resolve("key.pem")),
  cert: readFileSync(path.resolve("cert.pem")),
};

const httpsServer = createHttpsServer(httpsConfig, handler);

httpsServer.listen(https_port, () =>
  console.log(`HTTPS Server listening on port ${https_port}`)
);
