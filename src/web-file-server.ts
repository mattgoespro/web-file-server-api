import path from "path";
import { startFileServer } from "./api/api";

const serveDir = path.resolve(process.env.SERVE_DIR || "dist");
console.log(serveDir);
startFileServer(serveDir);
