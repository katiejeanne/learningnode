document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn").addEventListener("click", sendReq);
});

const requestUrl = "/read";

sendReq = async () => {
  //   let payload = [];
  //   for (let i = 0; i < 5; i++) {
  //     payload.push({ id: i, message: `Payload Message: ${i}\n` });
  //   }
  const response = await fetch(requestUrl, {
    method: "POST",
    body: document.getElementById("input").value,
    // body: JSON.stringify(payload),
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });
  document.getElementById("msg").textContent = response.statusText;
  const responseText = await response.text();
  //   console.log("Server response: ", responseText);
  //   document.getElementById("body").textContent = responseText;
  const container = document.getElementById("body");
  container.innerHTML = ""; // Clear existing content
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = responseText;
  container.appendChild(tempDiv);
};
