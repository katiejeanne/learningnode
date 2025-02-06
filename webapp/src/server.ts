import { createServer } from "http";
import { handler } from "./handler";

const port = 5001;

const server = createServer();

server.on("request", (req, res) => {
  if (req.url?.endsWith("favicon.ico")) {
    res.statusCode = 404;
    res.end();
  } else {
    handler(req, res);
  }
});

// server.on("request", handler);

server.listen(port);

server.on("listening", () => {
  console.log(`(Event) Server is listening on port ${port}`);
});

// Creates a simple HTTP server that listens for HTTP requests on port 5000 and processes them using the fundtion defined in handler.ts.
