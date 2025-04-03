import express, { Express } from "express";
// import multer from "multer";
// import { sanitizeValue } from "./sanitize";
// import { getValidationResults, validate } from "./validation";
import repository from "./data";
import { getJsonCookie, setJsonCookie } from "./cookies";
import cookieMiddleware from "cookie-parser";
import { customSessionMiddleware } from "./sessions/middleware";
import { getSession, sessionMiddleware } from "./sessions/session_helpers";

const rowLimit = 10;

// const fileMiddleware = multer({ storage: multer.memoryStorage() });

export const registerFormMiddleware = (app: Express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieMiddleware("mysecret"));
  // app.use(customSessionMiddleware());
  app.use(sessionMiddleware());
};

export const registerFormRoutes = (app: Express) => {
  app.get("/form", async (req, resp) => {
    try {
      resp.render("age", {
        history: await repository.getAllResults(rowLimit),
        // personalHistory: getJsonCookie(req, "personalHistory"),
        personalHistory: getSession(req).personalHistory,
      });
    } catch (error) {
      console.log("Error fetching results:", error);
    }
  });

  app.post("/form", async (req, resp) => {
    try {
      const nextage =
        Number.parseInt(req.body.age) + Number.parseInt(req.body.years);

      await repository.saveResult({ ...req.body, nextage });

      req.session.personalHistory = [
        {
          name: req.body.name,
          age: req.body.age,
          years: req.body.years,
          nextage,
        },
        ...(req.session.personalHistory || []),
      ].splice(0, 5);

      // setJsonCookie(resp, "personalHistory", pHistory);

      const context = {
        ...req.body,
        nextage,
        history: await repository.getAllResults(rowLimit),
        personalHistory: req.session.personalHistory,
      };
      resp.render("age", context);
    } catch (error) {
      console.log("Error fetching history.", error);
    }
  });
};

// export const registerFormRoutes = (app: Express) => {
//   app.get("/form", (req, resp) => {
//     resp.render("age", { helpers: { pass } });
//   });

//   app.post("/form", (req, resp) => {
//     const nextage =
//       Number.parseInt(req.body.age) + Number.parseInt(req.body.years);
//     const context = {
//       ...req.body,
//       nextage,
//     };
//     resp.render("age", context);
//   });

//   // app.post(
//   //   "/form",
//   //   validate("name").required().minLength(5),
//   //   validate("age").isInteger(),
//   //   (req, resp) => {
//   //     const validation = getValidationResults(req);
//   //     const context = { ...req.body, validation, helpers: { pass } };
//   //     if (validation.valid) {
//   //       context.nextage = Number.parseInt(req.body.age) + 1;
//   //     }
//   //     resp.render("age", context);
//   //   }
//   // );
// };

// const pass = (valid: any, propname: string, test: string) => {
//   let propResult = valid?.results?.[propname];
//   return `display:${!propResult || propResult[test] ? "none" : "block"}`;
// };

// Using Express automatic sanitizing
// export const registerFormRoutes = (app: Express) => {
//
//   Using url encoded get request to render results
//   app.get("/form", (req, resp) => {
//     for (const key in req.query) {
//       resp.write(`${key}: ${req.query[key]}\n`);
//     }
//     resp.end();
//   });

//   app.post("/form", fileMiddleware.single("datafile"), (req, resp) => {
//     resp.render("FormData", {
//       ...req.body,
//       file: req.file,
//       fileData: req.file?.buffer.toString(),
//     });
//   });

// Using custom sanitize function
// app.post("/form", fileMiddleware.single("datafile"), (req, resp) => {
//   resp.setHeader("Content-Type", "text/html");

//   for (const key in req.body) {
//     resp.write(`<div>${key}: ${sanitizeValue(req.body[key])}</div>`);
//   }

//   if (req.file) {
//     resp.write(`<div>File: ${req.file.originalname}</div>`);
//     resp.write(`<div>${sanitizeValue(req.file.buffer.toString())}</div>`);
//   }

//   resp.end();
// });

// Without sanitization
// app.post("/form", fileMiddleware.single("datafile"), (req, resp) => {
//   resp.write(`Content-Type: ${req.headers["content-type"]}\n`);

//   for (const key in req.body) {
//     resp.write(`${key}: ${req.body[key]}\n`);
//   }

//   if (req.file) {
//     resp.write(`---\nfile: ${req.file.originalname}\n`);
//     resp.write(req.file.buffer.toString());
//   }

//   resp.end();
// });
// };
