import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: "./src/client/client.js",
  output: {
    path: path.resolve(__dirname, "dist/client"),
    filename: "bundle.js",
  },
  devServer: {
    static: ["./static"],
    port: 5100,
    client: { webSocketURL: "ws://localhost:5001" },
  },
  devtool: "inline-source-map",
  module: {
    rules: [{ test: /\.handlebars$/, loader: "handlebars-loader" }],
  },
  resolve: {
    alias: {
      "@templates": path.resolve(__dirname, "templates/client"),
    },
  },
};
