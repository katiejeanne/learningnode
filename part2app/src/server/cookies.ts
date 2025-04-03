// import { IncomingMessage, ServerResponse } from "http";
// import { signCookie, validateCookie } from "./cookies_signed";
import { CookieOptions, Request, Response } from "express";

// const setHeaderName = "Set-Cookie";
// const cookieSecret = "mysecret";

export const setCookie = (
  resp: Response,
  name: string,
  val: string,
  opts?: CookieOptions
) => {
  resp.cookie(name, val, {
    maxAge: 300 * 1000,
    sameSite: "strict",
    signed: true,
    ...opts,
  });
};

// export const setCookie = (resp: ServerResponse, name: string, val: string) => {
//   const signedCookieVal = signCookie(val, cookieSecret);
//   let cookieVal: any[] = [
//     `${name}=${signedCookieVal}; Max-Age=300; SameSite=Strict }`,
//   ];
//   if (resp.hasHeader(setHeaderName)) {
//     cookieVal.push(resp.getHeader(setHeaderName));
//   }
//   resp.setHeader("Set-Cookie", cookieVal);
// };

export const setJsonCookie = (resp: Response, name: string, val: any) => {
  setCookie(resp, name, JSON.stringify(val));
  // setCookie(resp, name, JSON.stringify(val));
};

export const getCookie = (req: Request, key: string): string | undefined => {
  return req.signedCookies[key];
};

// export const getCookie = (
//   req: IncomingMessage,
//   key: string
// ): string | undefined => {
//   let result: string | undefined = undefined;
//   req.headersDistinct["cookie"]?.forEach((header) => {
//     header.split(";").forEach((cookie) => {
//       const { name, val } = /^(?<name>.*)=(?<val>.*)$/.exec(cookie)
//         ?.groups as any;
//       if (name.trim() === key) {
//         result = validateCookie(val, cookieSecret);
//       }
//     });
//   });
//   return result;
// };

export const getJsonCookie = (req: Request, key: string): any => {
  const cookie = getCookie(req, key);
  return cookie ? JSON.parse(cookie) : undefined;
};

// export const getJsonCookie = (req: IncomingMessage, key: string): any => {
//   const cookie = getCookie(req, key);
//   return cookie ? JSON.parse(cookie) : undefined;
// };
