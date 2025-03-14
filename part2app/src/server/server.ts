import { createServer } from "http";
import express, { Express } from "express";
import { testHandler } from "./testHandler";
import httpProxy from "http-proxy";
import helmet from "helmet";
// import { registerCustomTemplateEngine } from "./custom_engine";
import { engine } from "express-handlebars";
import * as helpers from "./template_helpers";

const port = 5001;

const expressApp: Express = express();

const proxy = httpProxy.createProxyServer({
  target: "http://localhost:5100",
  ws: true,
});

// registerCustomTemplateEngine(expressApp);
expressApp.set("views", "templates/server");

expressApp.engine(
  "handlebars",
  engine({
    layoutsDir: "templates/server",
  })
);
expressApp.set("view engine", "handlebars");

expressApp.use(helmet());
expressApp.use(express.json());

expressApp.get("/dynamic/:file", (req, res) => {
  res.render(`${req.params.file}.handlebars`, {
    message: "Hello template",
    req,
    helpers: { ...helpers },
  });
});

expressApp.get("/dynamic/:file", (req, res) => {
  res.render(`${req.params.file}.custom`, { message: "Hello template", req });
});

expressApp.post("/test", testHandler);
expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));
expressApp.use((req, res) => proxy.web(req, res));

const server = createServer(expressApp);

server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
