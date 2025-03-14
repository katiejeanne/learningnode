import { readFile } from "fs";
import { Express } from "express";
import * as features from "./custom_features";

const renderTemplate = (
  path: string,
  context: any,
  callback: (err: any, response: string | undefined) => void
) => {
  readFile(path, (err, data) => {
    if (err != undefined) {
      callback("Cannot generate content", undefined);
    } else {
      callback(
        undefined,
        parseTemplate(data.toString(), { ...context, features })
      );
    }
  });
};

const parseTemplate = (template: string, context: any) => {
  const ctx = Object.keys(context)
    .map((k) => `const ${k} = context.${k};`)
    .join("");
  const expr = /{{(.*)}}/gm;
  return template.toString().replaceAll(expr, (match, group) => {
    const evalFunc = (expr: string) => {
      return eval(`${ctx};${expr}`);
    };
    try {
      if (group.trim()[0] === "@") {
        group = `features.${group.trim().substring(1)}`;
        group = group.replace(/\)$/m, ", context, evalFunc)");
      }
      let result = evalFunc(group);
      if (expr.test(result)) {
        result = parseTemplate(result, context);
      }
      return result;
    } catch (err: any) {
      return err;
    }
    // return context[group.trim()] ?? "(no data)";
  });
};

export const registerCustomTemplateEngine = (expressApp: Express) =>
  expressApp.engine("custom", renderTemplate);

/*
Code with comments inserted: // Import `readFile` from Node's filesystem module to read template files.
import { readFile } from "fs";  

// Import `Express` for type reference (not used directly but for TypeScript clarity).
import { Express } from "express";  

// Import all custom feature functions (like `style`, `partial`, etc.) into a `features` object.
import * as features from "./custom_features";  

// ==============================
// 🚀 `renderTemplate()` — Entry Point for Rendering
// ==============================

const renderTemplate = (
  path: string,      // `path`: Path to the template file.
  context: any,      // `context`: Data that will be injected into the template.
  callback: (err: any, response: string | undefined) => void  // Callback for handling the result or errors.
) => {
  // Read the template file from the filesystem.
  readFile(path, (err, data) => {
    // If there's an error (e.g., file not found), send an error via callback.
    if (err != undefined) {
      callback("Cannot generate content", undefined);

    // If no error, parse the template content and pass it to the callback.
    } else {
      callback(
        undefined,                                // No error, so `undefined` for the first argument.
        parseTemplate(data.toString(),            // Convert file data (buffer) to a string before parsing.
          { ...context, features }                // Merge the provided `context` with imported `features`.
        )                                         // This allows `@style`, `@conditional`, etc., to be accessible in templates.
      );
    }
  });
};

// ==============================
// 🔍 `parseTemplate()` — Core Logic for Processing Templates
// ==============================

const parseTemplate = (template: string, context: any) => {
  
  // Create a string of JavaScript `const` declarations from the context object.
  // Example:
  // context = { user: { name: "Alice" } }
  // ctx = "const user = context.user;"
  const ctx = Object.keys(context)
    .map((k) => `const ${k} = context.${k};`)
    .join("");  // Joins declarations with no extra semicolons.

  // Define a regex pattern to match `{{ ... }}` expressions in the template.
  const expr = /{{(.*)}}/gm;  

  // Replace all `{{ ... }}` expressions in the template.
  return template.toString().replaceAll(expr, (match, group) => {

    // Helper function that evaluates a given expression using `eval()`.
    const evalFunc = (expr: string) => {
      return eval(`${ctx};${expr}`);  
      // Evaluates the `ctx` string first (which defines context variables),
      // followed by the expression itself. 
    };

    try {
      // ✅ Handle `@` Directives
      if (group.trim()[0] === "@") {  
        // If the captured group starts with `@`, treat it as a directive.

        // Rewrite `@directive` syntax to `features.directive`.
        // Example: `@style("bootstrap.min.css")` → `features.style("bootstrap.min.css")`
        group = `features.${group.trim().substring(1)}`;

        // Append `, context, evalFunc)` to the end of the directive call
        // so features like `@conditional()` can receive the required arguments.
        // Example: `features.conditional(...)` → `features.conditional(..., context, evalFunc)`
        group = group.replace(/\)$/m, ", context, evalFunc)");
      }

      // Evaluate the modified `group` (or the original if no `@` was found).
      let result = evalFunc(group);

      // If the evaluated result still contains `{{ ... }}`, recursively parse it.
      // This allows for nested or dynamic content rendering.
      if (expr.test(result)) {
        result = parseTemplate(result, context);
      }

      return result;  // Return the evaluated content.

    } catch (err: any) {
      // If an error occurs (e.g., syntax error in `eval()`), return the error itself.
      return err;
    }

    // 🚨 Commented-out alternative: A safer fallback that avoids `eval()`.
    // return context[group.trim()] ?? "(no data)";
  });
};

// ==============================
// 📌 `registerCustomTemplateEngine()` — Registers the Custom Engine with Express
// ==============================

export const registerCustomTemplateEngine = (expressApp: Express) =>
  expressApp.engine("custom", renderTemplate);  
// Tells Express to use `renderTemplate()` when rendering `.custom` files.

*/
