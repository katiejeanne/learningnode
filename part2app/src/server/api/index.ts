import { Express, response } from "express";
//import repository from "../data";
import { createAdapter } from "./http_adapter";
import { ResultWebService } from "./results_api";
import { Validator } from "./validation_adapter";
import { ResultWebServiceValidation } from "./results_api_validation";
import { FeathersWrapper } from "./feathers_adapter";
import { feathers } from "@feathersjs/feathers";
import feathersExpress, { rest } from "@feathersjs/express";
import { ValidationError } from "./validation_types";

export const createApi = (app: Express) => {
  // createAdapter(
  //   app,
  //   new Validator(new ResultWebService(), ResultWebServiceValidation),
  //   "/api/results"
  // );

  const feathersApp = feathersExpress(feathers(), app).configure(rest());

  const service = new Validator(
    new ResultWebService(),
    ResultWebServiceValidation
  );

  feathersApp.use("/api/results" as any, new FeathersWrapper(service) as any);

  feathersApp.hooks({
    error: {
      all: [
        (ctx) => {
          if (ctx.error instanceof ValidationError) {
            (ctx.http = { status: 400 }), (ctx.error = undefined);
          }
        },
      ],
    },
  });
};

// export const createApi = (app: Express) => {
//   app.get("/api/results", async (req, resp) => {
//     if (req.query.name) {
//       const data = await repository.getResultsByName(
//         req.query.name.toString(),
//         10
//       );
//       if (data.length > 0) {
//         resp.json(data);
//       } else {
//         resp.writeHead(404);
//       }
//     } else {
//       resp.json(await repository.getAllResults(10));
//     }
//     resp.end();
//   });

//   app.all("/api/results/:id", async (req, resp) => {
//     const id = Number.parseInt(req.params.id);
//     if (req.method === "GET") {
//       const result = await repository.getResultsById(id);
//       if (result === undefined) {
//         resp.writeHead(404);
//       } else {
//         resp.json(result);
//       }
//     } else if (req.method === "DELETE") {
//       let deleted = await repository.delete(id);
//       resp.json({ deleted });
//     }
//     resp.end();
//   });

//   app.post("/api/results", async (req, resp) => {
//     const { name, age, years } = req.body;
//     const nextage = Number.parseInt(age) + Number.parseInt(years);
//     const id = await repository.saveResult({
//       id: 0,
//       name,
//       age,
//       years,
//       nextage,
//     });
//     resp.json(await repository.getResultsById(id));
//     resp.end();
//   });
// };
