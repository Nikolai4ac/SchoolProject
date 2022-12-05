const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 8080;
const lookup = require('mime-types').lookup;
//npm -i mimi-types
const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url, true);
  //remove slashes through regEX
  let path = parsedURL.path.replace(/^\/+|\/+$/g, ""); //the path of the request.
  if (path == "") { //if the path is empty like ip:port/ 
    path = index.html; //go to the index.html
  }
  console.log(`Requested path: ${path} `); 
  let file = __dirname + "/public/" + path;
  fs.readFile(file, function (error, html) {
    if (error) {
      res.write(`Error: File not found! ${file}`);
      res.writeHead(404);
      res.end();
    } else {
      console.log(`Returning: ${path}`);
      res.setHeader("X-Content-Type-Options", "nosniff");
      let mime = lookup(path);
      res.writeHead(200, { "Content-Type": mime});
      res.end(html);
    }
  });
});

server.listen(port, function (error) {
  if (error) {
    console.log("Error loading the server, try again", error);
  } else {
    console.log("Server is running.");
    console.log(`Server is listening on port: ${port}`);
  }
});
