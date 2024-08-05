import fs from "fs";
import path from "path";
import api from "./api/api";

function checkEnv() {
  if (!process.env.PORT) {
    throw new Error("Environment value 'PORT' not set.");
  }

  if (!process.env.SERVE_DIR) {
    throw new Error("Environment value 'SERVE_DIR' not set.");
  }

  if (!fs.existsSync(process.env.SERVE_DIR)) {
    throw new Error("Directory specified by 'SERVE_DIR' does not exist.");
  }
}

checkEnv();

const serveDir = path.resolve(process.env.SERVE_DIR);

api.start(serveDir);
