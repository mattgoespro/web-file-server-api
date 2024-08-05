import fs from "fs";
import path from "path";
import express from "express";
import { FileType, supportedFileTypes } from "./model";

export function getFileRequestHandler(serveDir: string) {
  return (request: express.Request, response: express.Response) => {
    const fileType = request.params.fileType;
    const fileName = request.params.fileName;
    const filePath = path.join(serveDir, fileType, fileName);

    if (!fs.existsSync(filePath)) {
      response.status(404).send(`Requested file '${fileName}' not found.`);
      return;
    }

    if (!fs.statSync(filePath).isFile()) {
      response.status(400).send(`Requested file ${fileName} is not a file.`);
      return;
    }

    response.sendFile(filePath);
  };
}

export function listFilesRequestHandler(serveDir: string) {
  return (_request: express.Request, response: express.Response) => {
    const files = supportedFileTypes.flatMap((fileType) =>
      listRelativeFilePaths(serveDir, fileType)
    );
    console.log("[listFilesRequestHandler] response files:", files);
    response.status(200).send(files);
  };
}

function listRelativeFilePaths(serveDir: string, fileType: FileType) {
  console.log("[listFilePaths] serveDir:", serveDir);
  console.log("[listFilePaths] fileType:", fileType);
  const fileAbsoluteLocation = path.resolve(serveDir, fileType);

  if (!fs.existsSync(fileAbsoluteLocation)) {
    throw new Error(`Expected file directory '${fileAbsoluteLocation}' to exist.`);
  }

  const filesOfType = fs.readdirSync(fileAbsoluteLocation, {
    withFileTypes: true,
    encoding: "utf8"
  });

  return filesOfType.map((file) => path.join(fileType, file.name));
}

export function listFilesOfTypeRequestHandler(serveDir: string) {
  return (_request: express.Request, response: express.Response) => {
    const files = listRelativeFilePaths(serveDir, _request.params.fileType);
    console.log("[listFilesOfTypeRequestHandler] response files:", files);
    response.status(200).send(files);
  };
}

export function listSupportedFileTypesRequestHandler() {
  return (_request: express.Request, response: express.Response) => {
    response.status(200).send(supportedFileTypes);
  };
}
