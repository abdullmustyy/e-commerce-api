import http from "http";
import { requestHandler } from "./routes.js";

const server = http.createServer(requestHandler);

server.listen(3000);
