import { NextFunction, Request, Response } from "express";
import validator from "validator";

type ValidatedRequest = Request & {
  validation: {
    results: {
      [key: string]: {
        [key: string]: boolean;
        valid: boolean;
      };
    };
    valid: boolean;
  };
};

export const validate = (propName: string) => {
  const tests: Record<string, (val: string) => boolean> = {}; // Object that collects tests to perform
  const handler = (req: Request, resp: Response, next: NextFunction) => {
    const vreq = req as ValidatedRequest;
    if (!vreq.validation) {
      vreq.validation = { results: {}, valid: true };
    }
    vreq.validation.results[propName] = { valid: true };

    Object.keys(tests).forEach((k) => {
      let valid = (vreq.validation.results[propName][k] = tests[k](
        req.body?.[propName]
      ));
      if (!valid) {
        vreq.validation.results[propName].valid = false;
        vreq.validation.valid = false;
      }
    });

    next();
  }; // Object that performs all the validation checks

  // Method for registering that the string exists
  // Running this adds the function to the tests object so that the test will be run when an incoming request is processed
  handler.required = () => {
    tests.required = (val: string) =>
      !validator.isEmpty(val, { ignore_whitespace: true });
    // tests.required = (val: string) => val?.trim().length > 0; // The test that gets added to the tests object
    return handler; // Returns the handler object to enable chaining multiple validations
  };

  handler.minLength = (min: number) => {
    tests.minLength = (val: string) => validator.isLength(val, { min });
    // tests.minLength = (val: string) => val?.trim().length >= min;
    return handler;
  };

  handler.isInteger = () => {
    tests.isInteger = (val: string) => validator.isInt(val);
    tests.isInteger = (val: string) => /^[0-9]+$/.test(val);
    return handler;
  };
  return handler;
};

export const getValidationResults = (req: Request) => {
  return (req as ValidatedRequest).validation || { valid: true };
};
