import express from "express";
import endpoints from "./request/endpoints";
import {
  getFileRequestHandler,
  listFilesOfTypeRequestHandler,
  listFilesRequestHandler,
  listSupportedFileTypesRequestHandler
} from "./request/handlers";

function createApi() {
  return express();
}

export function start(serveDir: string) {
  const port = process.env.PORT || 3000;
  const api = createApi();

  api.get(endpoints.getFile, getFileRequestHandler(serveDir));
  api.get(endpoints.listFiles, listFilesRequestHandler(serveDir));
  api.get(endpoints.listFilesOfType, listFilesOfTypeRequestHandler(serveDir));
  api.get(endpoints.listSupportedFileTypes, listSupportedFileTypesRequestHandler());

  api.listen(port, () => {
    console.log(`Server is running on address 'http://localhost:${port}'`);
    console.log(`Serving files from '${serveDir}'...`);
  });
}

export default {
  start
};
