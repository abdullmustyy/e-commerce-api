import fs from "fs";

export const requestHandler = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.write(
      `<h1>Welcome! Please fill the form.</h1><p>Type the name of the user you want to create.</p><form action="/create-user" method="POST"><input type="text" name="user" /><button>Submit</button></form>`
    );
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
      fs.writeFile("message.txt", `The new user's name is ${user}`, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/confirm");
        return res.end();
      });
    });
  }
  if (url === "/confirm") {
    res.write("Success!");
    return res.end();
  }
};
