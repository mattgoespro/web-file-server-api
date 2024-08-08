import express from "express";
import { loggerMiddleware } from "./middleware";
import endpoints from "./request/endpoints";
import {
  getFileRequestHandler,
  listFilesOfTypeRequestHandler,
  listFilesRequestHandler,
  listSupportedFileTypesRequestHandler
} from "./request/handlers";

function createApi() {
  const api = express();

  api.set("strict routing", true); // configure api to match full path

  return api;
}

export function start(serveDir: string) {
  const port = process.env.API_SERVER_PORT || 3000;
  const api = createApi();

  // set up middleware
  api.use(express.json());
  api.use(express.urlencoded({ extended: true }));
  api.use(loggerMiddleware);

  api.get(endpoints.listSupportedFileTypes, listSupportedFileTypesRequestHandler());
  api.get(endpoints.getFile, getFileRequestHandler(serveDir));
  api.get(endpoints.listFiles, listFilesRequestHandler(serveDir));
  api.get(endpoints.listFilesOfType, listFilesOfTypeRequestHandler(serveDir));

  api.listen(port, () => {
    console.log(`Server is running on address 'http://localhost:${port}'`);
    console.log(`Serving files from '${serveDir}'...`);
  });
}

export default {
  start
};
