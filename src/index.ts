import path from "path";
import api from "./api/api";

function checkEnv() {
  if (!process.env.API_SERVER_PORT) {
    throw new Error("Environment value 'API_SERVER_PORT' not set.");
  }

  if (!process.env.MEDIA_DIR) {
    throw new Error("Environment value 'MEDIA_DIR' not set.");
  }
}

checkEnv();

const serveDir = path.resolve(process.env.MEDIA_DIR);

api.start(serveDir);
