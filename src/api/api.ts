import fs from "fs";
import path from "path";
import express from "express";
import { fileTypes } from "./model";

function createFileServer(serveDir: string) {
  const fileServer = express();

  fileTypes.forEach((fileType) => {
    fileServer.use(`/${fileType}`, express.static(path.join(serveDir, fileType)));
  });

  fileServer.get("/:fileType/:fileName", (req, res) => {
    const fileName = req.params.fileName;
    const fileType = req.params.fileType;
    const filePath = path.join(serveDir, fileType, fileName);

    if (!fs.existsSync(filePath)) {
      res.status(404).send(`File not found: ${fileName}`);
      return;
    }

    if (!fs.statSync(filePath).isFile()) {
      res.status(400).send(`Not a file: ${fileName}`);
      return;
    }

    res.sendFile(filePath);
  });

  fileServer.get("/", (_, res) => {
    res.status(200).send(fileTypes);
  });

  return fileServer;
}

export function startFileServer(serveDir: string) {
  const port = process.env.PORT || 3000;
  const server = createFileServer(serveDir);

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
