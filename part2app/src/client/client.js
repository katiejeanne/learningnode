document.addEventListener("DOMContentLoaded", () => {
  // do nothing
});

// From forms & validation chapter:

// import { validate } from "./client_validation";

// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("age_form").onsubmit = (ev) => {
//     const data = new FormData(ev.target);

//     const nameValid = validate("name", data).required().minLength(5);

//     const ageValid = validate("age", data).isInteger();

//     const allValid = [nameValid, ageValid]
//       .flatMap((v_result) =>
//         Object.entries(v_result.results).map(([test, valid]) => {
//           const e = document.getElementById(
//             `err_${v_result.propertyName}_${test}`
//           );
//           e.classList.add("bg-dark-subtle");
//           e.style.display = valid ? "none" : "block";
//           return valid;
//         })
//       )
//       .every((v) => v === true);

//     if (!allValid) {
//       ev.preventDefault();
//     }
//   };
// });

// From html templates chapter:

// document.addEventListener("DOMContentLoaded", () => {
//   // do nothing
// });

//import { IncomingMessage } from "http";
//import { Counter } from "./counter_custom";
//import * as Counter from "@templates/counter_client.handlebars";

// const context = {
//   counter: 0,
// };

// const actions = {
//   incrementCounter: () => {
//     context.counter++;
//     render();
//   },
// };

// const render = () => {
//   document.getElementById("target").innerHTML = Counter(context);
// };

// document.addEventListener("DOMContentLoaded", () => {
//   document.onclick = (ev) => {
//     const action = ev.target.getAttribute("action");
//     if (action && actions[action]) {
//       actions[action]();
//     }
//   };
//   render();
// });

// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("btn").addEventListener("click", sendReq);
// });
// sendReq = async () => {
//   const response = await fetch("/test", {
//     method: "POST",
//     body: JSON.stringify({ message: "Hello, World" }),
//     headers: { "Content-Type": "application/json" },
//   });
//   document.getElementById("msg").textContent = response.statusText;
//   document.getElementById("body").innerHTML = await response.text();
// };
