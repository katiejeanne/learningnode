import { test } from "node:test";
import { readHandler } from "./readHandler";
import { equal } from "assert";
import fs from "fs/promises";

const createMockResponse = (testCtx) => ({
  writeHead: testCtx.mock.fn(),
  setHeader: testCtx.mock.fn(),
  write: testCtx.mock.fn(),
  end: testCtx.mock.fn(),
});

test("readHandler tests", async (testCtx) => {
  // Arrange - set up the test
  const req = {};

  // const resp = {
  //   setHeader: testCtx.mock.fn(),
  //   write: testCtx.mock.fn(),
  //   end: testCtx.mock.fn(),
  // };

  // Test the successful outcome
  await testCtx.test("Successfully reads file", async (innerCtx) => {
    // Arrange
    const data = "data.json";
    innerCtx.mock.method(fs, "readFile", async () => data);
    const resp = createMockResponse(innerCtx);

    // Act perform the test
    await readHandler(req, resp);

    // Assert - verify the results
    equal(resp.setHeader.mock.calls[0].arguments[0], "Content-Type");
    equal(resp.setHeader.mock.calls[0].arguments[1], "application/json");
    equal(resp.write.mock.calls[0].arguments[0], data);
    equal(resp.end.mock.callCount(), 1);
  });

  // Test the failure outcome
  await testCtx.test("Handles error reading file", async (innerCtx) => {
    // Arrange
    innerCtx.mock.method(fs, "readFile", () => Promise.reject("file error"));
    const resp = createMockResponse(innerCtx);

    // Act
    await readHandler(req, resp);

    // Assert
    equal(resp.writeHead.mock.calls[0].arguments[0], 500);
    equal(resp.end.mock.callCount(), 1);
  });
});
// test("readHandler tests", async (testCtx) => {
//   // Arrange - set up the test
//   const data = "data.json";
//   testCtx.mock.method(fs, "readFile", (data, cb) => cb(undefined, data));
//   const req = {};

//   const resp = {
//     setHeader: testCtx.mock.fn(),
//     write: testCtx.mock.fn(),
//     end: testCtx.mock.fn(),
//   };

//   // Act - perform the test
//   await readHandler(req, resp);

//   // Assert - verify the results
//   equal(resp.setHeader.mock.calls[0].arguments[0], "Content-Type");
//   equal(resp.setHeader.mock.calls[0].arguments[1], "application/json");
//   equal(resp.write.mock.calls[0].arguments[0], data);
//   equal(resp.end.mock.callCount(), 1);
// });

// test("readHandler tests", (testCtx) => {
//   // Arrange - set up the test
//   const req = {
//     pipe: testCtx.mock.fn(),
//     on: testCtx.mock.fn((event, callback) => {
//       if (event === "end") callback();
//     }),
//   };

//   const resp = {
//     cookie: testCtx.mock.fn(),
//     setHeader: testCtx.mock.fn(),
//     send: testCtx.mock.fn(),
//   };

//   // TODO - Act - perform the test
//   readHandler(req, resp);

//   // TODO - Assert - verify the results

//   //   equal(req.pipe.mock.callCount(), 1);
//   //   equal(req.pipe.mock.calls[0].arguments[0], resp);
//   equal(resp.cookie.mock.callCount(), 1);
//   equal(resp.cookie.mock.calls[0].arguments[0], "sessionID");
//   equal(resp.cookie.mock.calls[0].arguments[1], "mysecretcode");
//   if (
//     req.pipe.mock.callCount() !== 1 ||
//     req.pipe.mock.calls[0].arguments[0] !== resp
//   ) {
//     throw new Error("Request no piped");
//   }
//   if (resp.cookie.mock.callCount() === 1) {
//     const [name, val] = resp.cookies.mock.calls[0].arguments;
//     if (name !== "sessionID" || val !== "mysecretcode") {
//       throw new Error("Cookie not set correctly");
//     }
//   } else {
//     throw new Error("cookie method not called once");
// }
// });
