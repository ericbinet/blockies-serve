import * as http from "http";
import * as blockies from "ethereum-blockies-png";

const port = 7168;

const requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
  let url = request.url.toLowerCase();
  if (url.match("^/0x[a-f0-9]+") === null) {
    response.statusCode = 404;
    response.end("not found");
    return;
  }

  const address = url.substr(1);

  // Generate a PNG binary
  const buffer = blockies.createBuffer({
    seed: address,
    scale: 8
  });

  response.setHeader("Content-Type", "image/png");
  response.end(buffer);
}

const server = http.createServer(requestHandler)

server.on("error", (err: Error) => {
  console.error("ERROR", err.message);
  process.exit(-1);
});

server.listen(port, () => {
  console.log(`server is listening on ${port}`);
})
